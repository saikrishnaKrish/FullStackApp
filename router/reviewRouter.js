const express = require('express');
const { createReview } = require('../controller/reviewController');
const { protectedRoute } = require('../controller/authController');

const reviewRouter = express.Router();

reviewRouter.post("/:productId",protectedRoute, createReview);

module.exports=reviewRouter