import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTemp } from "../../../redux/actions/index.js";

function FilterByTemperament() {
  
  const data = useSelector(state => state.temperaments)
  const dispatch = useDispatch();
  console.log(data)

  const handleFilterByTemperament = (e)=>{
    dispatch(filterByTemp(e.target.value))
  }

  return (
    <div className="container-filter-continent">
      <select onChange={(e)=> handleFilterByTemperament(e)}>
        <option value="all" >Todos los temperamentos</option>
        { data.map((e, i) => <option value={e.name} key={i}>{e.name}</option>) }
      </select>
    </div>
  );
}

export default FilterByTemperament;