import React, { useEffect, useState } from 'react';
import { Card } from '../partials';
import { getFavorites } from '../../api/UsersAPI';

function Favorites() {
  const [products, setProducts] = useState([]);

  const fetchFavorites = async () => {
    return getFavorites().then((res) => {
      setProducts(res.items.map((i) => ({ ...i, isFavorite: true })) || []);
    });
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className='row'>
      <div className='col-12'>
        <h1 className='font-clash text-white mb-5'>
          My <span className='text-gradient'>Favorites</span>
        </h1>
      </div>
      {products?.map((favorite, key) => (
        <div className='col-12 col-md-6 col-lg-4 my-3' key={key}>
          <Card product={favorite} refetch={fetchFavorites} />
        </div>
      ))}
    </div>
  );
}

export default Favorites;
