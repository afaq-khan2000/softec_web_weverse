const mongoose = require('mongoose');
const InventoryType = require('../constants/InventoryType');

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    marketPrice: {
      type: Number,
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(InventoryType),
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    minAge: {
      type: Number,
      required: true,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const addServerUrl = (image) => {
  if (typeof image === 'undefined') {
    return null;
  }
  const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
  if (!image.startsWith('http')) {
    return `${SERVER_URL}/${image}`;
  }

  return image;
};

itemSchema.pre('find', function (next) {
  for (let i = 0; i < this.length; i++) {
    this[i].image = addServerUrl(this[i].image);
  }

  return next();
});

itemSchema.pre('findOne', function (next) {
  this.image = addServerUrl(this.image);
  return next();
});

itemSchema.pre('findOneAndUpdate', function (next) {
  this.image = addServerUrl(this.image);
  return next();
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
