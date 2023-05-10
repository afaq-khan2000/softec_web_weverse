import { Menu, menuClasses } from "react-pro-sidebar";

const CustomMenu = ({ children }) => {
  return (
    <Menu
      menuItemStyles={{
        button: ({ level, active, disabled, hover }) => {
          if (level === 0)
            return {
              color: '#b58900',
              backgroundColor: hover ? 'yellow' : '#002b36',
              transition: 'all 0.2s ease-in-out'
            };
        },
      }}
      rootStyles={{
        ['.' + menuClasses.button]: {

          '&:hover': {
            backgroundColor: '#00222b',
          },
        },
      }}
      transitionDuration='500'
    >
      {children}
    </Menu>
  )
}

export default CustomMenu