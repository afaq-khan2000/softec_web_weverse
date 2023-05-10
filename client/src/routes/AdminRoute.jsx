import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../api/UsersAPI';

const AdminRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMe()
      .then((res) => {
        if (res.user.role !== 'admin') {
          navigate('/');
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return null;

  return children;
};

export default AdminRoutes;
