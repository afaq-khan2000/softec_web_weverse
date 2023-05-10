const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ['pending', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentId: {
      type: String,
      required: true,
    },
    address: {
      city: String,
      country: String,
      line1: String,
      line2: String,
      postal_code: String,
      state: String,
    },
    email: String,
    name: String,
    phone: String,
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
