import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
  }, [navigate]);

  return children;
};

export default ProtectedRoutes;
