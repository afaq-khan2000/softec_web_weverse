const User = require('../models/User');
const Order = require('../models/Order');
const removeFiles = require('../utils/removeFiles');
const uploadFiles = require('../utils/uploadFiles');
const stripe = require('stripe')(
  'sk_test_51Lcpl3Bf25LGtW9h8EGbj8RJSfcQWNHxZCuaIsEPtx60W8BPxw4R1bbTgydzfIMoH9qEzOElqDlviGOqrnEhlTwl00f6ADqWmE',
);

const getMe = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select('-password');

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        profilePicture: user.profilePicture?.startsWith('http')
          ? user.profilePicture
          : `${process.env.SERVER_URL}${user.profilePicture}`,
        email: user.email,
        dob: user.dob,
        gender: user.gender,
        isBlacklisted: user.isBlacklisted,
        blacklistReason: user.blacklistReason,
        role: user.isAdmin ? 'admin' : 'user',
      },
    });
  } catch (error) {
    console.log('users/me error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const updateMe = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, dob, gender } = req.body;
    const { profilePicture } = req?.files;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (dob) user.dob = dob;
    if (gender) user.gender = gender;
    if (profilePicture && typeof profilePicture !== 'string') {
      if (user.profilePicture !== 'https://picsum.photos/200/200') {
        await removeFiles(user.profilePicture);
      }

      user.profilePicture = await uploadFiles(profilePicture);
    }

    await user.save();

    res.status(200).json({ message: 'Updated successfully!' });
  } catch (error) {
    console.log('users/updateMe error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).populate('favorites');

    res.status(200).json({ items: user.favorites });
  } catch (error) {
    console.log('users/favorites error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const addToFavorites = async (req, res) => {
  try {
    const { id } = req.user;
    const { itemId } = req.body;

    const user = await User.findById(id);

    if (user.favorites.includes(itemId)) {
      return res.status(400).json({ message: 'Item already in favorites' });
    }

    user.favorites.push(itemId);

    await user.save();

    res.status(200).json({ message: 'Added to favorites' });
  } catch (error) {
    console.log('users/addToFavorites error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const { id } = req.user;
    const { itemId } = req.params;

    const user = await User.findById(id);

    if (!user.favorites.find((item) => item == itemId)) {
      return res.status(400).json({ message: 'Item not in favorites' });
    }

    user.favorites = user.favorites.filter((item) => item != itemId);

    await user.save();

    res.status(200).json({ message: 'Removed from favorites' });
  } catch (error) {
    console.log('users/removeFromFavorites error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).populate('cart.item');

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.log('users/getCart error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { itemId, quantity } = req.body;

    const user = await User.findById(id);

    if (!user || !user.cart) {
      return res.status(404).json({ message: 'User or cart not found' });
    }

    const item = user.cart.find((item) => item.item == itemId);

    if (item) {
      item.quantity += quantity;
      if (item.quantity <= 0) {
        user.cart = user.cart.filter((item) => item.item != itemId);
      }
    } else {
      user.cart.push({ item: itemId, quantity });
    }

    await user.save();

    res.status(200).json({ message: 'Added to cart' });
  } catch (error) {
    console.log('users/addToCart error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { itemId } = req.params;

    const user = await User.findById(id);

    if (!user.cart.includes(itemId)) {
      return res.status(400).json({ message: 'Item not in cart' });
    }

    user.cart = user.cart.filter((item) => item.item != itemId);

    await user.save();

    res.status(200).json({ message: 'Removed from cart' });
  } catch (error) {
    console.log('users/removeFromCart error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const checkout = async (req, res) => {
  try {
    const { id } = req.user;
    const { token } = req.body;

    const user = await User.findById(id).populate('cart.item');

    if (!user.cart.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const ammount = user.cart.reduce((acc, item) => {
      return acc + item.item.marketPrice * item.quantity;
    }, 0);

    const charge = await stripe.charges.create({
      amount: ammount * 100,
      currency: 'PKR',
      description: 'Game Hub payment',
      source: token.id,
    });

    const order = new Order({
      user: id,
      items: user.cart,
      paymentId: charge.id,
      address: {
        city: charge.billing_details.address.city,
        country: charge.billing_details.address.country,
        line1: charge.billing_details.address.line1,
        line2: charge.billing_details.address.line2,
        postal_code: charge.billing_details.address.postal_code,
        state: charge.billing_details.address.state,
      },
      name: charge.billing_details.name,
      email: charge.billing_details.email,
      phone: charge.billing_details.phone,
      total: ammount,
    });

    await order.save();

    user.cart = [];

    await user.save();

    res.status(200).json({ message: 'Checked out successfully' });
  } catch (error) {
    console.log('users/checkout error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const getBlacklist = async (req, res) => {
  try {
    const blacklistedUsers = await User.find({ isBlacklisted: true });

    res.status(200).json({ blacklistedUsers });
  } catch (error) {
    console.log('users/getBlacklist error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const blacklistUser = async (req, res) => {
  try {
    const { userId, reason } = req.body;

    const user = await User.findByIdAndUpdate(userId, {
      isBlacklisted: true,
      blacklistReason: reason,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User blacklisted' });
  } catch (error) {
    console.log('users/getBlacklist error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const updateBlacklistReason = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    const user = await User.findByIdAndUpdate(userId, {
      blacklistReason: reason,
    });

    if (!user || !user.isBlacklisted) {
      return res
        .status(404)
        .json({ message: 'User not found or not blacklisted' });
    }

    res.status(200).json({ message: 'Blacklist reason updated' });
  } catch (error) {
    console.log('users/getBlacklist error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const unblacklistUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(userId, {
      isBlacklisted: false,
      blacklistReason: '',
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User unblacklisted' });
  } catch (error) {
    console.log('users/getBlacklist error: ', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMe,
  updateMe,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  getCart,
  addToCart,
  removeFromCart,
  checkout,
  getBlacklist,
  blacklistUser,
  updateBlacklistReason,
  unblacklistUser,
};
