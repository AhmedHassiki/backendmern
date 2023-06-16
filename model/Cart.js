const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const cartSchema = new Schema(
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
      productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Products',
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  )

const Cart = model('carts', cartSchema);
module.exports = Cart;