import axios from './axios.config';

const getOrders = async () => {
  return axios.get('/orders').then((res) => {
    return res.data;
  });
};

export { getOrders };
