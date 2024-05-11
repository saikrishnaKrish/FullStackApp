import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { Logout } from "@mui/icons-material";
import "./NavBar.css";

const NavBar = () => {
  const activeState = ({ isActive }) => {
    return {
      color: isActive ? "green" : "",
      // backgroundColor: isActive ? "grey" : "",
      fontWeight: isActive ? "bold" : "",
      // padding: isActive ? " 2px 14px" : "",
      borderRadius: isActive ? "25px" : "",
    };
  };
  const { userDetails,handleLogout } = useAuthContext();

  console.log(userDetails)
  const quantity = useSelector((store) => store.cartReducer.cartQuantity);
  const [anchorEl,setAnchorEl] = useState();
  const open =Boolean(anchorEl);
  const handleClick=(e)=>{
    setAnchorEl(e.currentTarget);
  }

  const handleClose = ()=>{
    setAnchorEl(null);
  }



  return (
    <div className="navbar">
      <NavLink style={activeState} to={"/"}>
        Home{" "}
      </NavLink>
      {/* <NavLink style={activeState} to="/hooks">HooksExample</NavLink>   */}
      {/* <NavLink style={activeState} to={"/user"} >Users</NavLink>  */}
      {Object.keys(userDetails).length > 0 && (
        <>
       
          <NavLink style={activeState} to={"/cart"}>
              <div className="cart_container">
                <ShoppingCartIcon></ShoppingCartIcon>
                <div className="cart_quantity">{quantity}</div>
              </div>
            </NavLink>
          {/* <NavLink style={activeState} to={"/logout"}>Logout</NavLink> */}
         
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography> */}
       

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32,fontWeight:'larger' }}>{
              userDetails.name[0]
            }</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
          <NavLink>

          <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
          <NavLink style={activeState} to={"/profile"}>
        <MenuItem onClick={handleClose}>
          <Avatar /> 
            Profile{" "}

        </MenuItem>
          </NavLink>
          <NavLink style={activeState} to={"/"} disabled>
        <MenuItem onClick={handleClose}>
          <Avatar />
            My Account{" "}
        </MenuItem>
          </NavLink>
        <Divider />
    
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
        </NavLink>
        </>
      )}
    </div>
  );
};

export default NavBar;
