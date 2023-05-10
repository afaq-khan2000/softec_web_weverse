const mongoose = require('mongoose');

const querySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    messages: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ['pending', 'resolved', 'deleted'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
