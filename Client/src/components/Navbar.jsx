import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="nav">
      <div className="logo">To do</div>
     <ul className="nav-links">
        <li><Link to='/'>List</Link></li>
        <li><Link to='/add-task '>Add task</Link></li>
     </ul>
    </div>
  );
}

export default Navbar;
