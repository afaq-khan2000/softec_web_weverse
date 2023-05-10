const Order = require('../models/Order');

const getOrders = async (req, res) => {
  try {
    const { id, role } = req.user;
    const { page, perPage, status } = req.query;

    let q;

    if (role === 'admin') {
      q = Order.find();
    } else {
      q = Order.find({ user: id });
    }

    q = q.sort({ createdAt: -1, updatedAt: -1, status: 1 });

    if (page) {
      q = q.skip((parseInt(page) - 1) * parseInt(perPage));
    }

    if (perPage) {
      q = q.limit(parseInt(perPage));
    }

    if (status) {
      q = q.where({ status });
    }

    const orders = await q.populate('user').populate('items.item').exec();

    res.status(200).json({ orders });
  } catch (error) {
    console.log('orders/getAllOrders error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('user')
      .populate('items.item')
      .exec();

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log('orders/getOrder error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order updated' });
  } catch (error) {
    console.log('orders/updateOrder error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(id, { status: 'cancelled' });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    console.log('orders/deleteOrder error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { id } = req.user;
    const { orderId, item, rating, comment } = req.body;

    const review = await Review.create({
      user: id,
      item,
      order: orderId,
      rating,
      comment,
    });

    res.status(200).json({ review, message: 'Review created' });
  } catch (error) {
    console.log('orders/createReview error: ', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  createReview,
};
