import React from "react";
import { useDispatch } from "react-redux";
import { filterByContinent } from "../../../redux/actions/index.js";

function FilterByContiinent() {
  
  const dispatch = useDispatch();

  const handleFilterContinent = (e)=>{
    dispatch(filterByContinent(e.target.value))
  }

  return (
    <div className="container-filter-continent">
      <select onChange={(e)=> handleFilterContinent(e)}>
        <option value="all" >Todos</option>
        <option value="Europe">Europa</option>
        <option value="Africa">Africa</option>
        <option value="Oceania">Oceania</option>
        <option value="Asia">Asia</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
      </select>
    </div>
  );
}

export default FilterByContiinent;