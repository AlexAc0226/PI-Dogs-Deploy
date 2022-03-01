import React from "react";
import {Link} from 'react-router-dom';

import "../Navbar/Navbar.css";

import SearchBar from "../Searchbar/Searchbar.js";
import OrderByName from "../Ordering/OrderByName/OrderByName";
import OrderByPopulation from "../Ordering/OrderByPopulation/OrderByPopulation";
import FilterByContiinent from '../Filter/FilterByContinent/FilterByContiinent';
import FilterByActivity from '../Filter/FilterByActivity/FilterByActivity';

function Navbar() {
  return (
    <div className="container-navbar">
      <div className="nav">
        <ul className="navbar-ul">
          <Link to='/'><li className="navbar-li">HOME</li></Link>
          <Link to='/activity/new'><li className="navbar-li">CREATE ACTIVITY</li></Link>
          <li className="navbar-li-seatchBar"><SearchBar /></li>
          <li><OrderByName /></li>
          <li><OrderByPopulation /></li>
          <li><FilterByContiinent /></li>
          <li><FilterByActivity /></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
