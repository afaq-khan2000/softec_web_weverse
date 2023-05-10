import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo, user } from '../../assets';
// import { Base_URL } from "../../url";
import { navLinks } from '../../constants';
import { CartFill, ChevronDown, Heart, HeartFill } from 'react-bootstrap-icons';
import { isLoggedIn, logout } from '../../api/AuthAPI';
import { getCart, getMe } from '../../api/UsersAPI';
// import { navLinks } from "../../Constants";
import { user as userImg } from '../../assets';

function Navbar(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  window.addEventListener('storage', () => {
    setLoggedIn(isLoggedIn());
  });

  const [pic, setPic] = useState('');
  useEffect(() => {
    if (loggedIn) {
      getMe().then((res) => {
        setPic(res.user.profilePicture);
      });
    }
  }, [loggedIn]);

  return (
    <div className='sticky-top w-100 mx-auto'>
      <nav className='py-3 navbar navbar-expand-lg navbar-light background-dark paddingX'>
        {loggedIn && (
          <div className='dropdown d-inline mr-4 d-lg-none'>
            <Link
              className='dropdown-toggle'
              to='#'
              role='button'
              id='profile-dropdown'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <img
                src={pic}
                alt=''
                width={'40px'}
                height={'40px'}
                style={{ borderRadius: '20px' }}
                className=''
              />
            </Link>
            <div className='dropdown-menu' aria-labelledby='profile-dropdown'>
              <Link className='dropdown-item' to='/profile'>
                My Profile
              </Link>
              <button
                className='dropdown-item btn btn-sm background-secondary rounded-pill py-2 px-4'
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        )}

        <Link to={'/'}>
          <img
            src={logo}
            alt=''
            width={'200px'}
            className='img-fluid pulse d-none d-lg-inline'
          />
          <img
            src={logo}
            alt=''
            width={'150px'}
            className='img-fluid pulse d-inline d-lg-none'
          />
        </Link>
        {/* <h1 className="font-clash text-white">Digi-Corn</h1> */}

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav mx-auto'>
            <div className='dropdown'>
              <li
                className='background-dark dropdown-toggle text-white mx-4 pulse nav-link'
                type='button'
                id='dropdownMenuButton'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Browse
                <ChevronDown className='ml-2' />
              </li>
              <div
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton'
                style={{ backgroundColor: '#00222b' }}
              >
                <button
                  className='dropdown-item nav-link text-white'
                  onClick={() => navigate('/browse', { state: { type: 'GamingGear' } })}
                >
                  Gaming Gears
                </button>
                <button className='dropdown-item nav-link text-white'
                  onClick={() => navigate('/browse', { state: { type: 'VideoGames' } })}
                >
                  Video Games
                </button>
              </div>
            </div>
            {navLinks.map((link, id) => (
              <li className='nav-item' key={id}>
                <Link
                  className='nav-link text-white mx-4 pulse'
                  to={`${link.link}`}
                >
                  {link.title}
                </Link>
              </li>
            ))}

            {loggedIn ? (
              <li className='nav-item d-none d-lg-block'>
                <div className='dropdown'>
                  <Link
                    className='dropdown-toggle'
                    to='#'
                    role='button'
                    id='profile-dropdown'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <img
                      src={pic}
                      alt=''
                      width={'40px'}
                      height={'40px'}
                      style={{ borderRadius: '20px' }}
                      className=''
                    />
                  </Link>
                  <div
                    className='dropdown-menu'
                    aria-labelledby='profile-dropdown'
                  >
                    <Link className='dropdown-item' to='/profile'>
                      My Profile
                    </Link>
                    <Link className='dropdown-item' to='#'>
                      My NFTS
                    </Link>
                    <button
                      className='dropdown-item btn btn-sm background-secondary rounded-pill py-2 px-4'
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </li>
            ) : (
              <>
                <Link to={'/sign-up'}>
                  <button className='btn btn-sm background-secondary rounded-pill px-4 py-2 text-white mx-3 my-2 my-lg-0'>
                    Sign Up
                  </button>
                </Link>
                <Link to={'/login'}>
                  <button className='btn btn-sm background-secondary rounded-pill px-4 py-2 text-white mx-3 my-2 my-lg-0'>
                    Login
                  </button>
                </Link>
              </>
            )}

            <div className='px-4'>
              <Link to={'/favorites'}>
                <button className='btn btn-sm mr-3 py-2 text-white my-2 my-lg-0'>
                  <HeartFill color='#FF5733' size={'25px'} />
                </button>
              </Link>
              <Link to={'/cart'}>
                <button className='btn btn-sm py-2 text-white my-2 my-lg-0'>
                  <CartFill color='#b58900' size={'25px'} />
                </button>
              </Link>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
