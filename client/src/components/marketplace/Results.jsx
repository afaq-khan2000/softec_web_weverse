import React, { useState, useEffect } from 'react';
import { cardData } from '../../constants';
import { Card } from '../partials';
import { getGames, getGear } from '../../api/ItemsAPI';

function Results({ titleSearch, price, categories, type }) {

  const [products, setProducts] = useState([]);

  const fetchGames = async () => {
    return getGames().then((res) => {
      console.log(res)
      setProducts(res.items || []);
    });
  };

  const fetchGear = async () => {
    return getGear().then((res) => {
      console.log(res)
      setProducts(res.items || []);
    });
  };

  useEffect(() => {
    if (type === 'VideoGames') {
      fetchGames();
    } else if (type === 'GamingGear') {
      fetchGear();
    }

    console.log(type, '7877777777777')
  }, [type]);

  useEffect(() => {
    // apply price(min, max), categories, titleSearch filters
    let filteredProducts = products;

    filteredProducts = filteredProducts.filter(
      (product) => product.marketPrice >= price.min && product.marketPrice <= price.max);
    // if (price.min > -1 && price.max <= 100000) {
    // );
    // }

    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categories.includes(product.category)
      );
    }

    if (titleSearch !== '') {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(titleSearch.toLowerCase())
      );
    }
    setProducts(filteredProducts);


  }, [price, categories, titleSearch]);

  return (
    <div className='col-12 col-lg-9 px-0 px-lg-3'>
      <div className='row'>
        {products.map((product, key) => (
          <div className='col-12 col-md-6 col-lg-4 mb-4' key={key}>
            <Card
              product={product}
              refetch={fetchGames}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
