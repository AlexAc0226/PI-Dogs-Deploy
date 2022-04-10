import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { filterByRazaDog } from '../../../redux/actions/index'

function FilterByRaza() {
  
    const dispatch = useDispatch();
    const data = useSelector(state => state.dogs)

    let razaDogs = data.map(e => {
      let r1 = e.name.split(" ")
      let r2 = r1[0]
      return r2
    })
    const allRazasDogs = [...new Set(razaDogs)]

    const handleFilterRazaDog = (e)=>{
        dispatch(filterByRazaDog(e.target.value))
    }
  
    return (
    <div>
        <div>
          <select onChange={(e) => handleFilterRazaDog(e)}>
            <option value="" hidden>Razas de perros</option>
            <option value="all">Todas las razas de perros</option>
            { allRazasDogs.map((e, i) => <option value={e} key={i}>{e}</option>) }
          </select>
        </div>
    </div>
  )
}

export default FilterByRaza