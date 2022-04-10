/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getDog, getTemperament } from "../../redux/actions/index";

import Card from "../Card/Card";
import Render_Paginate from "./Render_Paginate";

import "./Paginate.css";

function Paginate() {
  const data = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage; //10 = pagina 0 * cantidad de elementos/paises 10
  const indexOfFisrtDog = indexOfLastDog - dogsPerPage; //0
  const currentDogs = data.slice(indexOfFisrtDog, indexOfLastDog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDog());
    dispatch(getTemperament())

    
  }, [dispatch]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const prevPage = ()=>{
    setCurrentPage(currentPage - 1);
  }

  const nextPage = ()=>{
    setCurrentPage(currentPage + 1);
  }

  return (
    <div className="container-paginate">
      
      {currentPage !== 1 ? <button className="paginate-btn" onClick={()=>  prevPage() }>← Back</button> : ""}  
      <Render_Paginate
        dogsPerPage={dogsPerPage}
        allDogs={data.length}
        paginado={paginado}
      />
      {currentPage < Math.ceil(data.length / 8) ? <button className="paginate-btn" onClick={()=>  nextPage() }>Next →</button> : ""}      
      
      <div className="pos-card">
      {currentDogs.map((res, index) => {
        return (
          <div className={""} key={index}>
            {
              res.weight !== null ? <Card
              id={res.id}
              name={res.name}
              image={res.image}
              temperament={res.temperament}
              weight={res.weight}
            /> : ""
            }
          </div>
        );
      })}

      </div>
    </div>
  );
}

export default Paginate;
