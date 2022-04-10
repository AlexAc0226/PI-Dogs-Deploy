import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { filterByActivity } from '../../../redux/actions/index'

function FilterByActivity() {
  
    const dispatch = useDispatch();

    const data = useSelector(state => state.activities)

    const handleFilterActivity = (e)=>{
        dispatch(filterByActivity(e.target.value))
    }
  
    return (
    <div>
        <div>
          <select onChange={(e) => handleFilterActivity(e)}>
            <option value="" hidden>Tourist activity</option>
            <option value="all">Todas las actividades</option>
            {
              data.map((e, i) => <option value={e.name} key={i}>{e.name}</option>)
            }
          </select>
        </div>
    </div>
  )
}

export default FilterByActivity