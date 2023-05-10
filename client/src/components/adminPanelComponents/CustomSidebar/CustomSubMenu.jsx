import React from 'react'
import { SubMenu } from 'react-pro-sidebar'

const CustomSubMenu = ({label, icon,children}) => {
  return (
    <SubMenu label={label}
      icon={icon}
      rootStyles={{
        borderBottom: '1px solid #004556',
      }}
    >
      {children}
    </SubMenu>
  )
}

export default CustomSubMenu;