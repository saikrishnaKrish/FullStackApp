const bookingModel = require("../models/bookingModel");
const userModel = require("../models/userModel");
const crypto = require("crypto");


const Razorpay = require("razorpay");
require("dotenv").config();


const createBooking = async (req, res) => {
  try {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
      });

    const { productId } = req.params;
    const userId = req.userId;
    const { priceAtBooking } = req.body;
    console.log("product", productId);

    const bookingObj = {
      user: userId,
      product: productId,
      priceAtBooking,
    };

    const booking = await bookingModel.create(bookingObj);
    console.log("booking", booking._id);
  
  /** 2 update user with booking details, there are interdependece between the models */
    const user = await userModel.findOne({ _id: userId });
    console.log("user details", user);
    user.bookings.push(booking._id);
    console.log(req.params);
    await user.save();

    /** 1 creating order on razorpay */
    var options = {
      amount: priceAtBooking * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: booking._id.toString(), //order id
    };

    const order = await instance.orders.create(options);
    console.log("order created at razorpay", order);
    booking.paymentOrderId = order.id;
    console.log("bookings",booking);
    booking.status="confirmed";
    await booking.save();

   return res.status(200).json({
      message: "Order created successfully",
      order: order,
    });

  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      status: "failure",
      message: err.message,
    });
  }
};

const getBookingDetails = async (req, res) => {
  try {
    const allBookings = await bookingModel
      .find()
      .populate({ path: "user", select: "name email" })
      .populate({ path: "product", select: "name price" });
    res.status(200).json({
      message: "got all bookings",
      data: allBookings,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const verifyBooking = async (req, res) => {
  try {
    console.log("webhook called");
    const shasum = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET);
    shasum.update(JSON.stringify(req.body));
    const freshSignature = shasum.digest("hex");
    if (freshSignature == req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
      /** updating the status */
      const booking = await bookingModel.findOne({
        paymentOrderId: req.body.payload.payment.entity.order_id,
      });
      booking.status = "confirmed";
      await booking.save();
      res.json({ status: "ok" });
    } else {
      res.status(401).json({
        status: "invalid request",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  createBooking,
  getBookingDetails,
  verifyBooking,
};
