import { toast } from 'react-toastify';
import axios from './axios.config';

const getMe = async () => {
  return axios.get('/users/me').then((res) => res.data);
};

const updateMe = async ({ name, profilePicture }) => {
  const formData = new FormData();

  if (name) formData.append('name', name);
  if (profilePicture) formData.append('profilePicture', profilePicture);

  return axios
    .put('/users/me', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => toast.success('Profile  updated Successfully'));
};

const getFavorites = async () => {
  return axios.get('/users/favorites').then((res) => res.data);
};

const addToFavorites = async ({ itemId }) => {
  return axios.post('/users/favorites', { itemId }).then((res) => res.data);
};

const removeFromFavorites = async ({ itemId }) => {
  return axios.delete(`/users/favorites/${itemId}`).then((res) => res.data);
};

const getCart = async () => {
  return axios.get('/users/cart').then((res) => res.data);
};

const addToCart = async ({ itemId }) => {
  return axios.put('/users/cart', { itemId, quantity: 1 }).then((res) => res.data);
};

const removeFromCart = async ({ itemId }) => {
  return axios.delete(`/users/cart/${itemId}`).then((res) => res.data);
};

const checkout = async ({ token }) => {
  return axios.post('/users/cart/checkout', { token }).then((res) => res.data);
};

const getBlacklist = async () => {
  return axios.get('/users/blacklist').then((res) => res.data);
};

const blacklistUser = async ({ userId, reason }) => {
  return axios
    .post('/users/blacklist', { userId, reason })
    .then((res) => res.data);
};

const updateBlacklistReason = async ({ userId, reason }) => {
  return axios
    .put(`/users/blacklist/${userId}`, { reason })
    .then((res) => res.data);
};

const unblacklistUser = async ({ userId }) => {
  return axios.delete(`/users/blacklist/${userId}`).then((res) => res.data);
};

export {
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
