import React, { useEffect, useState } from 'react';
import { Filters, Results, Search } from '../components/marketplace';
import { useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

function Marketplace(props) {
  const { state } = useLocation();
  const [price, setPrice] = useState({
    min: 1,
    max: 100000,
  });

  const [categories, setCategories] = useState([]);
  const [titleSearch, setTitleSearch] = useState('');
  const [type, setType] = useState('VideoGames')
  const location = useLocation();

  // take type state out of useLocation state in useEfect
  useEffect(() => {
    if (
      location.state &&
      location.state.type
    ) {
      setType(location.state.type)
    }
  }, [location.state]);

  useEffect(() => {
    if (state.type) {
      // do update type
    }
    if (state.category) {
      setCategories([state.category]);
    }
  }, [state]);

  useEffect(() => {
    if (state.type) {
      // do update type
    }
    if (state.category) {
      setCategories([state.category]);
    }
  }, [state]);

  return (
    <div className='px-5 background-dark pb-10 pt-5'>
      <div className='row'>
        <Search titleSearch={titleSearch} setTitleSearch={setTitleSearch} />
        <Filters
          price={price}
          setPrice={setPrice}
          categories={categories}
          setCategories={setCategories}
        />
        <Results
          titleSearch={titleSearch}
          price={price}
          categories={categories}
          type={type}
        />
      </div>
    </div>
  );
}

export default Marketplace;
