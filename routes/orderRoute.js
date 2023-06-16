const express = require('express');
const controller = require ('../controllers/orderController')
const isAuth = require('../middleware/IsAuth')
const router = express.Router();


router.post('/', isAuth, controller.createOrder);
router.get('/', isAuth, controller.getOrders);
// router.delete('/:id', controller.)


module.exports = router;