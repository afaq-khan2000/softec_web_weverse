import React from "react";
import { Link } from "react-router-dom";

function Sidebar(props) {
  return (
    <div className="col-3 sticky-lg-top d-none d-lg-block h-100"
      style={{ top: "100px" }}
    >
      <Link to="/profile" className="paraColor d-block font-clash h4 translateX sidebar-links">Profile</Link>
      <Link to="/orders" className="paraColor d-block font-clash h4 translateX sidebar-links">My Orders</Link>
    </div>
  );
}

export default Sidebar;
