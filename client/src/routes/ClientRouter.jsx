import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer, Navbar } from '../components/partials';
import {
  CartPage,
  FavoritesPage,
  Home,
  Login,
  Marketplace,
  ProductPage,
  Profile,
  SignUp,
} from '../pages';
import Orders from '../pages/Orders';
import ProtectedRoutes from './ProtectedRoutes';

const ClientRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='login' element={<Login />} />
        <Route
          path='/favorites'
          element={
            <ProtectedRoutes>
              <FavoritesPage />
            </ProtectedRoutes>
          }
        />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route
          path='/cart'
          element={
            <ProtectedRoutes>
              <CartPage />
            </ProtectedRoutes>
          }
        />
        <Route path='/browse' element={<Marketplace />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/orders'
          element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default ClientRouter;
