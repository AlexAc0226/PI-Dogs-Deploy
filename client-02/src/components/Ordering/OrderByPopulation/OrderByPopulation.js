import React from 'react'
import { useDispatch } from "react-redux";

import { orderByPopulation } from '../../../redux/actions/index';

function OrderByPopulation() {
  
    const dispatch = useDispatch();

    function handleOrderCountries(e){
      dispatch(orderByPopulation(e.target.value));
    }

    return (
    <div>
      <select onChange={(e)=> handleOrderCountries(e)}>
        <option value="" hidden>Population ordering</option>
        <option value="des" key="des">Lower to higher</option>
        <option value="asc" key="asc">Higher to lower </option>
      </select>
    </div>
  )
}

export default OrderByPopulation

/*
<button onClick={()=> dispatch(orderByPopulation('des'))} >Poblacion: De menor a mayor</button>
<button onClick={()=> dispatch(orderByPopulation('asc'))} >Poblacion: De mayor a menor</button>
*/