const Query = require('../models/Query');
const { io } = require('../utils/socketInit');

const getQueries = async (req, res) => {
  try {
    const { id, role } = req.user;
    const { page, perPage, status } = req.query;

    let q;

    if (role === 'admin') {
      q = Query.find();
    } else {
      q = Query.find({ user: id, status: { $ne: 'deleted' } });
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

    const queries = await q.populate('user').populate('items.item').exec();

    res.status(200).json({ queries });
  } catch (error) {
    console.log('queries/getQueries error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const getQuery = async (req, res) => {
  try {
    const { id } = req.params;

    const query = await Query.findById(id)
      .populate('user')
      .populate('items.item')
      .exec();

    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }

    res.status(200).json({ query });
  } catch (error) {
    console.log('queries/getQuery error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const createQuery = async (req, res) => {
  try {
    const { id } = req.user;
    const { item, message } = req.body;

    const query = await Query.create({
      user: id,
      item,
      messages: [
        {
          user: id,
          message,
        },
      ],
    });

    res.status(200).json({ query });
  } catch (error) {
    console.log('queries/createQuery error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, isAdmin } = req.user;
    const { message } = req.body;

    const query = await Query.findById(id).exec();

    if (!query || query.status === 'pending') {
      return res.status(404).json({ message: 'Query not found' });
    }

    query.messages.push({
      user: userId,
      message,
    });

    await query.save();

    if (isAdmin) {
      io.to(query.user).emit('newMessage', {
        queryId: query._id,
        message,
        time: new Date(),
      });
    } else {
      const admin = await User.findOne({ isAdmin: true });
      io.to(admin._id).emit('newMessage', {
        queryId: query._id,
        message,
        time: new Date(),
      });
    }

    res.status(200).json({ query });
  } catch (error) {
    console.log('queries/sendMessage error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const updateQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const query = await Query.findById(id).exec();

    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }

    query.status = status;
    await query.save();

    res.status(200).json({ query });
  } catch (error) {
    console.log('queries/updateQuery error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteQuery = async (req, res) => {
  try {
    const { id } = req.params;

    const query = await Query.findByIdAndUpdate(id, { status: 'deleted' });

    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }

    res.status(200).json({ query });
  } catch (error) {
    console.log('queries/deleteQuery error: ', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQueries,
  getQuery,
  createQuery,
  sendMessage,
  updateQuery,
  deleteQuery,
};
