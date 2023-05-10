import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminRouter from './AdminRouter';
import AdminRoute from './AdminRoute';
import ClientRouter from './ClientRouter';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/admin/*'
          element={
            <AdminRoute>
              <AdminRouter />
            </AdminRoute>
          }
        />
        <Route path='*' element={<ClientRouter />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
