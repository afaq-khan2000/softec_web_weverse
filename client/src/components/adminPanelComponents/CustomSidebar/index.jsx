import { ArrowLeft, ArrowRight, Controller, Icon123 } from 'react-bootstrap-icons';
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu, menuClasses } from 'react-pro-sidebar';
import CustomMenuItem from './CustomMenuItem';
import CustomMenu from './CustomMenu';
import CustomSubMenu from './CustomSubMenu';
import { IoLogoGameControllerB } from 'react-icons/io';
import { HiShoppingCart } from 'react-icons/hi';
import { GiBigGear } from 'react-icons/gi';
import { FaUsers } from 'react-icons/fa';
import { IoNewspaper } from 'react-icons/io5';
import { BiCategoryAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { logo, logo_small } from '../../../assets';

const CustomSidebar = () => {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
  return (
    <>
      <div style={{ minHeight: '100%' }} className='d-flex flex-column align-items-center position-relative background-dark'>
        {/* <Link
          to={'/'}>
          {collapsed ?
            <img
              src={logo_small}
              alt=''
              width={'50px'}
              className='d-none d-lg-inline mb-3'
            /> :
            <img
              src={logo}
              alt=''
              width={'250px'}
              className='img-fluid d-none d-lg-inline'
            />}
        </Link> */}
        <Sidebar backgroundColor='#002b36' breakPoint='lg' rootStyles={{ minHeight: '100%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '100%' }}>
          <CustomMenu>
            <CustomSubMenu label="Inventory" icon={<BiCategoryAlt />}>
              <CustomMenuItem label='Video Games' icon={<IoLogoGameControllerB />} route='/admin/games-inventory' />
              <CustomMenuItem label='Gaming Gear' icon={<GiBigGear />} route='/admin/gear-inventory' />
            </CustomSubMenu>
            <CustomMenuItem label='Orders' icon={<HiShoppingCart />} route='/admin/orders' />
            <CustomMenuItem label='Customers' icon={<FaUsers />} route='/admin/customers' />
            <CustomMenuItem label='Complaints' icon={<IoNewspaper />} route='/admin/complaints' />
          </CustomMenu>
        </Sidebar>
        {/* <div className='d-flex align-items-end justify-content-between'>

          <ArrowLeft
            color='red'
          />
        </div> */}
      </div>
    </>
  )
}

export default CustomSidebar;