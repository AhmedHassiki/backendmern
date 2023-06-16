const express = require('express');
const controller = require ('../controllers/CartController')
const isAuth = require('../middleware/IsAuth')
const router = express.Router();


router.post('/', isAuth, controller.addToCart);
router.get('/', isAuth, controller.getCartItems);
router.delete('/:id', controller.deleteCart)


module.exports = router;