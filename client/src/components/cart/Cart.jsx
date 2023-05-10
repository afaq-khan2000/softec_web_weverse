import React, { useEffect, useState } from 'react';
import { cardData } from '../../constants';
import { CartCard } from '../partials';
import StripeCheckout from 'react-stripe-checkout';
import { checkout } from '../../api/UsersAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart({ items, fetchCartItem }) {
  const navigate = useNavigate();

  const handleToken = async (token) => {
    try {
      const response = await checkout({ token });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      navigate('/orders');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.item.marketPrice * item.quantity;
      // console.log(item.item.marketPrice)
    });
    setTotal(totalPrice);
  }, [items])
  

  return (
    <div className='row pt-5'>
      <div className='col-12'>
        <h1 className='font-clash text-white mb-5'>
          My <span className='text-gradient'>Cart</span>
        </h1>
      </div>
      <div className='col-6'>
        {items?.map((item, key) => (
          <CartCard product={item.item} quantity={item.quantity} key={key} fetchCartItem={fetchCartItem} />
        ))}
      </div>
      <div className='col-1'></div>
      <div className='col-5 background-gray rounded-border p-5 h-100 sticky-lg-top'>
        <div className='row'>
          <div className='col-12'>
            {' '}
            <h1 className='font-clash paraColor'>Total</h1>
          </div>
          <div className='col-12'>
            <hr className='background-secondary' />
          </div>
          <div className='col-6'>
            <h5 className='font-clash paraColor'>Sub-Total: </h5>
          </div>
          <div className='col-6'>
            <h5 className='font-clash paraColor'>PKR {total}</h5>
          </div>
          <div className='col-6'>
            <h5 className='font-clash paraColor'>Delivery Fee: </h5>
          </div>
          <div className='col-6'>
            <h5 className='font-clash paraColor'>PKR 0.00</h5>
          </div>
          <div className='col-12'>
            <hr className='background-secondary' />
          </div>
          <div className='col-12 mt-3'>
            <StripeCheckout
              name='Game Hub'
              description={`Payment of PKR 2000`}
              amount={total * 100} // Stripe expects amount in cents
              currency='PKR'
              stripeKey={import.meta.env.VITE_STRIPE_KEY}
              token={handleToken}
              shippingAddress
              billingAddress
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
