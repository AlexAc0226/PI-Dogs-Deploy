import React from 'react';
import './Card.css'
import {Link} from "react-router-dom"

function Card({id, name, image, temperament, weight}) {
  return (
      <div className="container-all">
       <div className="card-container">
       <div className="title-card">
          
            <h1 className="card-subtitle">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        </div>
        <div className="img-container">
            <img src={image} className="img-card" alt="img not found"/>
        </div>
        <br />

        <div className="card-content">
            
            <br />

            <div className="">
                <h1 className="card-title">Peso promedio:</h1>
                {
                    weight ? <h3 className="card-subtitle">{weight} Kg</h3> :
                    <h3 className="card-subtitle">No tiene definido el peso</h3>
                }
                <br />

                <h1 className="card-title">Temperamento/s:</h1>
                {
                    temperament ? <h3 className="card-subtitle">{temperament}</h3> :
                    <h3 className="card-subtitle">No tiene definido algun temperamento</h3>
                }
            </div>

        </div>
            <div className="btn">
               <Link to={`/detail/${id}`} > 
                <button className="card-btn">
                        Ver más...      
                </button>
               </Link>
            </div>
      </div> 

      </div>
  ) 
}

export default Card;
