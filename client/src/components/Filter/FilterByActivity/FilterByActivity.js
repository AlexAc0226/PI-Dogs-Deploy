import React from 'react'
import { useDispatch } from 'react-redux'

import { filterByActivity } from '../../../redux/actions/index'

function FilterByActivity() {
  
    const dispatch = useDispatch();

    const handleFilterActivity = (e)=>{
        dispatch(filterByActivity(e.target.value))
    }
  
    return (
    <div>
        <div>
          <select onChange={(e) => handleFilterActivity(e)}>
            <option value="" hidden>Tourist activity</option>
            <option value="all">Todas las actividades</option>
            <option value="business">TURISMO DE NEGOCIOS</option>
            <option value="urban">TURISMO URBANO</option>
            <option value="natural">TURISMO NATURAL</option>
            <option value="conventional">TURISMO CONVENCIONAL</option>
            <option value="no_conventional">TURISMO NO CONVENCIONAL</option>
            <option value="gastronomic">TURISMO GASTRONÓMICO</option>
            <option value="advanture">TURISMO DE AVENTURA</option>
            <option value="ecological">TURISMO ECOLÓGICO</option>
            <option value="cultural">TURISMO CULTURAL</option>
            <option value="health">TURISMO DE SALUD</option>
            <option value="sports">TURISMO DEPORTIVO</option>
            <option value="sun_and_beach">TURISMO DE SOL Y PLAYA</option>
            <option value="solidary">TURISMO SOLIDARIO</option>
            <option value="shopping">TURISMO DE COMPRAS</option>
            <option value="luxury">TURISMO DE LUJO</option>
          </select>
        </div>
    </div>
  )
}

export default FilterByActivity