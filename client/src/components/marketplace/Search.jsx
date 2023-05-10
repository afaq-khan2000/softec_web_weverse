import React from 'react';

function Search({ titleSearch, setTitleSearch }) {
    return (
        <>
        <div className="col-12 col-lg-3"></div>
        <div className='col-12 col-lg-9 mb-0 d-block d-lg-none'>
            <div className="form-group">
            <input
              id="search"
              type="text"
              className="form-control form-control-lg background-gray rounded-border paraColor formInput"
              placeholder='Search'
              value={titleSearch}
              onChange={(e) => setTitleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className='col-12 col-lg-9 mb-3 d-none d-lg-block'>
            <div className="form-group">
            <input
              id="search"
              type="text"
              className="form-control form-control-lg background-gray rounded-border paraColor formInput"
              placeholder='Search'
              value={titleSearch}
              onChange={(e) => setTitleSearch(e.target.value)}
            />
          </div>
        </div>
        </>
    );
}

export default Search;