import React from 'react'
import { useDispatch } from "react-redux";

import { orderByWeight } from '../../../redux/actions/index';

function OrderByWeight() {
  
    const dispatch = useDispatch();

    function handleOrderByWeigth(e){
      dispatch(orderByWeight(e.target.value));
    }

    return (
    <div>
      <select onChange={(e)=> handleOrderByWeigth(e)}>
        <option value="" hidden>Ordenar por peso</option>
        <option value="des" key="des">De menor a mayor</option>
        <option value="asc" key="asc">De mayor a menor</option>
      </select>
    </div>
  )
}

export default OrderByWeight