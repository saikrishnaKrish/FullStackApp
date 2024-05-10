import { NavLink } from "react-router-dom";
import "./NavBar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { useAuthContext } from "../contexts/AuthContext";

const NavBar = () => {
  const activeState = ({ isActive }) => {
    return {
      color: isActive ? "rgb(253 230 138)" : "",
      backgroundColor: isActive ? "rgb(69 26 3)" : "",
      fontWeight: isActive ? "bold" : "",
      padding: isActive ? " 2px 14px" : "",
      borderRadius: isActive ? "25px" : "",
    };
  };
  const { userDetails } = useAuthContext();
  const quantity = useSelector((store) => store.cartReducer.cartQuantity);
  
  return (
    <div className="navbar">
      <NavLink style={activeState} to={"/"}>
        Home{" "}
      </NavLink>
      {/* <NavLink style={activeState} to="/hooks">HooksExample</NavLink>   */}
      {/* <NavLink style={activeState} to={"/user"} >Users</NavLink>  */}
      {Object.keys(userDetails).length > 0 && (
        <>
          <NavLink style={activeState} to={"/profile"}>
            Profile{" "}
          </NavLink>

          {/* <NavLink style={activeState} to={"/logout"}>Logout</NavLink> */}
          <NavLink style={activeState} to={"/cart"}>
            <div className="cart_container">
              <ShoppingCartIcon></ShoppingCartIcon>
              <div className="cart_quantity">{quantity}</div>
            </div>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default NavBar;
