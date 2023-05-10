import axios from './axios.config';
import io from 'socket.io-client';

let socket;

const register = async ({ name, email, password, dob, gender }) => {
  return axios
    .post('/auth/register', {
      name,
      email,
      password,
      dob,
      gender,
    })
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';

      socket = io(import.meta.env.VITE_SERVER_URL, {
        query: {
          token: res.data.token,
        },
      });

      return res.data;

    });
};

const login = async ({ email, password }) => {
  return axios
    .post('/auth/login', {
      email,
      password,
    })
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';

      socket = io(import.meta.env.VITE_SERVER_URL, {
        query: {
          token: res.data.token,
        },
      });

      return res.data;
    });
};

const isLoggedIn = () => {
  return localStorage.getItem('token') ? true : false;
};

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
  // socket.disconnect();
};

export { register, login, logout, isLoggedIn, socket };
