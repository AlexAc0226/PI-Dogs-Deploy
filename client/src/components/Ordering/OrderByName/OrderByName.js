import React from 'react'
import { useDispatch } from "react-redux";

import {orderByName} from '../../../redux/actions/index';

function OrderByName() {
  
  const dispatch = useDispatch();

  const handleOrderCountries = (e)=>{
    e.preventDefault();
    dispatch(orderByName(e.target.value))
  }

    return (
    <div>
      <select onChange={(e)=> handleOrderCountries(e)}>
        <option value="" hidden>Alphabetical order</option>
        <option value="des" key="des">Ordenar de A-z</option>
        <option value="asc" key="asc">Ordenar de Z-a</option>
      </select>
    </div>
  )
}

export default OrderByName

