import { ProSidebarProvider } from 'react-pro-sidebar';
import { Route, Routes } from 'react-router-dom';
import CustomersPage from '../pages/AdminPages/CustomersPage';
import ComplaintsPage from '../pages/AdminPages/ComplaintsPage';
import CustomSidebar from '../components/adminPanelComponents/CustomSidebar';
import OrdersPage from './../pages/AdminPages/OrdersPage';
import AdminNavBar from '../components/adminPanelComponents/AdminNavBar';
import VideoGamesInventory from '../pages/AdminPages/VideoGamesInventory';
import WelcomePage from '../pages/AdminPages/WelcomePage';
import GearInventory from '../pages/AdminPages/GearInventory';

const AdminRouter = () => {
  return (
    <ProSidebarProvider>
      <div className='d-flex flex-column h-100'>
        <AdminNavBar />
        <div className='d-flex h-100' style={{ minHeight: '100vh' }}>
          <CustomSidebar />
          <Routes>
            <Route path='/' element={<WelcomePage />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/customers' element={<CustomersPage />} />
            <Route path='/complaints' element={<ComplaintsPage />} />
            <Route path='/games-inventory' element={<VideoGamesInventory />} />
            <Route path='/gear-inventory' element={<GearInventory />} />
          </Routes>
        </div>
      </div>
    </ProSidebarProvider>
  );
};

export default AdminRouter;
