const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController')

router.get('/', controller.getProducts);
router.get('/:id', controller.getProduct)
router.post('/', controller.postProduct);
router.delete('/:id', controller.deleteProduct);
router.patch('/:id', controller.updateProduct);

module.exports = router;