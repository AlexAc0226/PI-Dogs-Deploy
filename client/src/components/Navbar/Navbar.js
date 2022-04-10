import React from "react";
import {Link} from 'react-router-dom';

import "../Navbar/Navbar.css";

import SearchBar from "../Searchbar/Searchbar.js";
import OrderByName from "../Ordering/OrderByName/OrderByName";
import OrderByWeight from "../Ordering/OrderByWeight/OrderByWeight";
import FilterByTemperament from '../Filter/FilterByTemperament/FilterByTemperament';
import FilterByRaza from '../Filter/FilterByRaza/FilterByRaza';

function Navbar() {
  return (
    <div className="container-navbar">
      <div className="nav">
        <ul className="navbar-ul">
          <Link to='/'><li className="navbar-li">Casa</li></Link>
          <Link to='/dogs/create'><li className="navbar-li">Formulario de creación</li></Link>
          <li className="navbar-li-seatchBar"><SearchBar /></li>
          <li><OrderByName /></li>
          <li><OrderByWeight /></li>
          <li><FilterByTemperament /></li>
          <li><FilterByRaza /></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
