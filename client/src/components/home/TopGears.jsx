import React, { useEffect, useState } from 'react';
import { cardData } from '../../constants';
import { Card } from '../partials';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getGear } from '../../api/ItemsAPI';
import { useNavigate } from 'react-router-dom';

function TopGears(props) {
  const [products, setProducts] = useState([]);

  const fetchGames = async () => {
    return getGear().then((res) => {
      setProducts(res.items || []);
    });
  };

  useEffect(() => {
    fetchGames();
  }, []);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const navigate = useNavigate();

  return (
    <div className='text-white mt-10'>
      <div className='row'>
        <div className='col-12 col-md-8 col-lg-9'>
          <h1 className='font-clash text-48'>Top Gaming Gear</h1>
          <p className='h5'>Explore All Gaming Gear</p>
        </div>
        <div className='col-12 col-md-4 col-lg-3 d-none d-md-block'>
          <button className='btn btn-lg background-secondary rounded-pill px-5 py-2 text-white'
            onClick={() => navigate('/browse', { state: { type: 'GamingGear' } })}
          >
            View All{' '}
          </button>
        </div>
      </div>
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        infinite={true}
        containerClass='carousel-container'
        removeArrowOnDeviceType={['tablet', 'mobile']}
        itemClass='carousel-item-padding-40-px'
        className='mt-5'
      >
        {products.map((product, key) => (
          <div className='col-12 my-3' key={key}>
            <Card product={product} refech={fetchGames} />
          </div>
        ))}
      </Carousel>
      {/* <div className="row mt-5">
        {cardData.map((product, key) => (
          <div className="col-12 col-md-6 col-lg-3 my-3" key={key}>
            <Card product={product} />
          </div>
        ))}
        <div className="col-12 d-block d-md-none">
          <button className="btn btn-lg background-secondary rounded-pill px-5 py-2 text-white w-100">
            View All{" "}
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default TopGears;
