import { useState, useEffect, useCallback } from 'react';
import { Banner, Details, Product } from '../components/productPage';
import { TopGames } from '../components/home';
import { cardData } from '../constants';
import { Route, Link, Routes, useParams } from 'react-router-dom';
import { getItem } from '../api/ItemsAPI';

function ProductPage(props) {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    return getItem(id).then((res) => {
      setProduct(res.item);
    });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    fetchProduct().finally(() => setLoading(false));
  }, [fetchProduct]);

  if (loading)
    return (
      <div
        style={{
          minHeight: '100vh',
        }}
      >
        Loading...
      </div>
    );

  return (
    <>
      <div className='paddingX background-dark pb-10'>
        <Product product={product} refetch={fetchProduct} />
        <TopGames />
      </div>
    </>
  );
}

export default ProductPage;
