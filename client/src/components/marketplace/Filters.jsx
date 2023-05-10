import React from 'react';
import { topCategories } from '../../constants';

function Filters({ price, categories, setPrice, setCategories }) {
  return (
    <>
      <div
        className='col-3 paraColor filters rounded-border px-3 py-5 h-100 sticky-lg-top d-none d-lg-block'
        style={{ top: '80px' }}
      >
        <p className='h4 font-clash text-white'>Price</p>
        <div className='row ml-3'>
          <div className='col-6'>
            {' '}
            <input
              id='minPrice'
              type='number'
              className='form-control background-gray rounded-border paraColor formInput'
              placeholder='Min'
              value={price.min}
              onChange={(e) => setPrice({ ...price, min: Number(e.target.value) })}
            />
          </div>
          <div className='col-6'>
            {' '}
            <input
              id='maxPrice'
              type='number'
              value={price.max}
              className='form-control background-gray rounded-border paraColor formInput'
              placeholder='Max'
              onChange={(e) => setPrice(
                { ...price, max: Number(e.target.value) }
              )}
            />
          </div>
          {/* <div className='col-12'>
            <button className='btn background-secondary rounded-pill px-5 py-2 text-white w-100 mt-3'>
              Apply
            </button>
          </div> */}
        </div>
        <hr className='background-gray' />
        <p className='h4 font-clash text-white'>Category</p>
        <div className='row ml-3'>
          {topCategories.map((cat, key) => (
            <div className='col-6 form-check' key={key}>
              <input
                className='form-check-input'
                type='checkbox'
                name='flexRadioDefault'
                id={cat.title}
                onChange={(e) =>
                  setCategories(
                    e.target.checked
                      ? [...categories, cat.title]
                      : categories.filter((c) => c !== cat.title)

                  )
                }
              />
              <label className='form-check-label' htmlFor={cat.title}>
                {cat.title}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* MOdal for small screen */}
      <div className='col-12 d-block d-lg-none'>
        <button
          type='button'
          className='btn background-secondary rounded-pill px-5 py-2 text-white w-100 mb-3'
          data-toggle='modal'
          data-target='#exampleModalCenter'
          style={{ position: 'sticky', top: '128px' }}
        >
          Filters
        </button>

        <div
          className='modal fade'
          id='exampleModalCenter'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalCenterTitle'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-dialog-centered' role='document'>
            <div className='modal-content background-gray text-white'>
              <div className='modal-header'>
                <h5
                  className='modal-title font-clash'
                  id='exampleModalLongTitle'
                >
                  Filters
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <p className='h4 font-clash text-white'>Blockchain</p>
                <div className='ml-3'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='etherium'
                    />
                    <label className='form-check-label' htmlFor='etherium'>
                      Etherium
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='blockchain1'
                    />
                    <label className='form-check-label' htmlFor='blockchain1'>
                      Blockchain 1
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='blockchain2'
                    />
                    <label className='form-check-label' htmlFor='blockchain2'>
                      Blockchain 2
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='solona'
                    />
                    <label className='form-check-label' htmlFor='solona'>
                      Solona
                    </label>
                  </div>
                </div>
                <hr className='background-gray' />
                <p className='h4 font-clash text-white'>Price</p>
                <div className='row ml-3'>
                  <div className='col-6'>
                    {' '}
                    <input
                      id='minPrice'
                      type='number'
                      className='form-control background-gray rounded-border paraColor formInput'
                      placeholder='Min'
                    />
                  </div>
                  <div className='col-6'>
                    {' '}
                    <input
                      id='maxPrice'
                      type='number'
                      className='form-control background-gray rounded-border paraColor formInput'
                      placeholder='Max'
                    />
                  </div>
                </div>
                <hr className='background-gray' />
                <p className='h4 font-clash text-white'>Category</p>
                <div className='row ml-3'>
                  {topCategories.map((cat, key) => (
                    <div className='col-6 form-check' key={key}>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='flexRadioDefault'
                        id={cat.title}
                      />
                      <label className='form-check-label' htmlFor={cat.title}>
                        {cat.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn background-dark rounded-pill px-5 py-2 text-white'
                  data-dismiss='modal'
                >
                  Close
                </button>
                <button className='btn background-secondary rounded-pill px-5 py-2 text-white'>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filters;