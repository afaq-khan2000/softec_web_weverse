import React from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router';

const CustomMenuItem = ({ label, icon, route = null }) => {
  const navigate = useNavigate();
  return (
    <MenuItem
      icon={icon}
      rootStyles={{
        color: '#b58900',
        backgroundColor: '#002b36',
        transition: 'all 0.2s ease-in-out',
        borderBottom: '1px solid #004556',
        '&:hover': {
          backgroundColor: '#002b36',
        },
      }}
      onClick={(e) => {
        e.preventDefault();
        route ? navigate(route) : console.log('cnrejkslfjc');
      }}
    >
      {label}
    </MenuItem>
  );
};

export default CustomMenuItem;
