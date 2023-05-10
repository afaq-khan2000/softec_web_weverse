import React, { useCallback } from 'react';
import { Cart, CartFill, HeartFill, StarFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { addToCart, addToFavorites, removeFromFavorites } from '../../api/UsersAPI';

function Product({ product, refetch }) {
  const navigate = useNavigate();
  const handleAddFavorite = useCallback(() => {
    if (localStorage.getItem('token')) {
      addToFavorites({ itemId: product._id }).then(() => refetch());
    } else {
      navigate('/login');
    }
  }, [product._id, navigate, refetch]);

  const handleRemoveFavorite = useCallback(() => {
    if (localStorage.getItem('token')) {
      removeFromFavorites({ itemId: product._id }).then(() => refetch());
    } else {
      navigate('/login');
    }
  }, [product._id, navigate, refetch]);

  return (
    <div className='row pt-10'>
      <div className='col-12 col-md-4 col-lg-6'>
        <img
          src={`${product?.image}`}
          alt=''
          className='img-fluid rounded-border'
        />
      </div>
      <div className='col-12 col-md-8 col-lg-6 background-gray rounded-border p-5 mt-3 mt-md-0'>
        <div className='row'>
          <div className='col-12 col-lg-8 my-auto'>
            <h1 className='font-clash paraColor'>{product?.title}</h1>
          </div>
          <div className='col-12 col-lg-4 my-auto'>
            <StarFill color='#b58900' className='mr-2' />
            <StarFill color='#b58900' className='mr-2' />
            <StarFill color='#b58900' className='mr-2' />
            <StarFill color='#b58900' className='mr-2' />
            <StarFill color='#b58900' className='mr-2' />
          </div>
        </div>

        <p className='font-clash paraColor mt-4'>{product?.description}</p>

        <p className='secondary h5'>Rs. {product?.marketPrice}</p>

        <p className='font-clash paraColor h6 mt-4 capitalize'>
          Genre: {product?.genre}
        </p>

        <p className='font-clash paraColor h6 mt-4'>
          In Stock: {product?.stock}
        </p>

        <div className='row mt-4'>
          <div className='col-12 col-lg-6'>
            <button
              className='btn btn-lg background-secondary rounded-pill w-100'
              onClick={
                product?.isFavorite ? handleRemoveFavorite : handleAddFavorite
              }
            >
              <HeartFill className='mr-2' />
              {product?.isFavorite
                ? 'Remove from Favorites'
                : 'Add to Favorites'}
            </button>
          </div>
          <div className='col-12 col-lg-6 mt-3 mt-lg-0'>
            <button className='btn btn-lg background-secondary rounded-pill w-100'>
              <CartFill className='mr-2'
                onClick={() => {
                  addToCart({ itemId: product._id })
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
