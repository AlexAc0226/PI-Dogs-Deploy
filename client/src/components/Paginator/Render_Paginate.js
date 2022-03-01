/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import './Paginate.css';

function Render_Paginate({countriesPerPage, allCountries, paginado}) {
  
    const pageNumber = []
    
    for(let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++){
        pageNumber.push(i);   
    }

    return (
    <>
                        {
                    pageNumber && pageNumber.map((number, index) =>{
                        return (
                            <button className="" key={index}>
                                <a onClick={()=> paginado(number)}>{number}</a>
                            </button>
                        )
                    })
                }

    </>
  )
}

export default Render_Paginate

/* 
<>
<nav>
    <ul>
        {
            pageNumber && pageNumber.map((number, index) =>{
                return (
                    <li key={index}>
                        <a onClick={()=> paginado(number)}>{number}</a>
                    </li>
                )
            })
        }
    </ul>
</nav>

</> */