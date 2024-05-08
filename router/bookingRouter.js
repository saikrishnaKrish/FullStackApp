const express= require('express');
const { createBooking, getBookingDetails, verifyBooking } = require('../controller/bookingController');
const { protectedRoute } = require('../controller/authController');
const bookingRouter = express.Router();

bookingRouter.post("/:productId",protectedRoute,createBooking);
bookingRouter.get("/",getBookingDetails);
bookingRouter.post("/verify",protectedRoute,verifyBooking);

module.exports=bookingRouter;