import React from 'react';
import { topCategories } from '../../constants';
import { useNavigate } from 'react-router-dom';

function TopCategories(props) {
  const navigate = useNavigate();

  return (
    <div className='text-white mt-10'>
      <div className='row'>
        <div className='col-12 col-md-8 col-lg-9'>
          <h1 className='font-clash text-48'>Top Games Categories</h1>
        </div>

      </div>
      <div className='row mt-5'>
        {topCategories.slice(0,  6).map((category,  key) => (
          <div className='col-6 col-lg-3 my-2 px-2 px-md-5' key={key}>
            <div
              className='background-gray p-2 rounded-border text-center pulse pointer'
              onClick={() =>
                navigate(`/browse`, {
                  state: {
                    type: 'VideoGame',
                    category: category.title,
                  },
                })
              }
            >
              <div
                className='rounded-border'
                style={{
                  backgroundImage: `url(${category.bg})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'full',
                  backgroundRepeat: 'no-repeat',
                  opacity: '0.5',
                }}
              >
                <img src={category.icon} alt='' className='' />
              </div>
              <p className='font-clash h5 mt-3'>{category.title}</p>
            </div>
          </div>
        ))}

      </div>

            {/* Top Gear */}

      <div className='row mt-5'>
        <div className='col-12 col-md-8 col-lg-9'>
          <h1 className='font-clash text-48'>Top Gaming Gear Categories</h1>
        </div>

      </div>
      <div className='row mt-5'>
        {topCategories.slice(6,  12).map((category,  key) => (
          <div className='col-6 col-lg-3 my-2 px-2 px-md-5' key={key}>
            <div
              className='background-gray p-2 rounded-border text-center pulse pointer'
              onClick={() =>
                navigate(`/browse`, {
                  state: {
                    type: 'GamingGear',
                    category: category.title,
                  },
                })
              }
            >
              <div
                className='rounded-border'
                style={{
                  backgroundImage: `url(${category.bg})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'full',
                  backgroundRepeat: 'no-repeat',
                  opacity: '0.5',
                }}
              >
                <img src={category.icon} alt='' className='' />
              </div>
              <p className='font-clash h5 mt-3'>{category.title}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default TopCategories;
