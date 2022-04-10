import React from 'react'
import { useDispatch } from "react-redux";

import {orderByName} from '../../../redux/actions/index';

function OrderByName() {
  
  const dispatch = useDispatch();

  const handleOrderDogs = (e)=>{
    e.preventDefault();
    dispatch(orderByName(e.target.value))
  }

    return (
    <div>
      <select onChange={(e)=> handleOrderDogs(e)}>
        <option value="" hidden>Orden alfabetico</option>
        <option value="des" key="des">Ordenar de A-z</option>
        <option value="asc" key="asc">Ordenar de Z-a</option>
      </select>
    </div>
  )
}

export default OrderByName

