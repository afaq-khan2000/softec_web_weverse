import React, { useCallback, useEffect, useState } from 'react';
import { Cart } from '../components/cart';
import { isLoggedIn } from '../api/AuthAPI';
import { getCart } from '../api/UsersAPI';
import { toast } from 'react-toastify';

function CartPage(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  window.addEventListener('storage', () => {
    setLoggedIn(isLoggedIn());
  });
  console.log(loggedIn, 'cnirkeoslh')
  const fetchCartItem = useCallback(async () => {
    if (loggedIn) {
      getCart().then((res) => {
        console.log(res.cart);
        setCartItems(res.cart);
      });
    }
  }, [loggedIn, setCartItems]);

  useEffect(() => {
    fetchCartItem()
  }, [loggedIn, fetchCartItem]);

  return (
    <div className='background-dark paddingX pb-10'>
      <Cart items={cartItems} fetchCartItem={fetchCartItem} />
    </div>
  );
}

export default CartPage;
