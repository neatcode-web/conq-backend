const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const orderController = require('../controllers/order.controller');
router.get('/',
    orderController.getOrders)

module.exports = router;