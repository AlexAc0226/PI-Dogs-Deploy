/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCountries } from "../../redux/actions/index";

import Card from "../Card/Card";
import Render_Paginate from "./Render_Paginate";

import "./Paginate.css";

function Paginate() {
  const data = useSelector((state) => state.allCountries);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage; //10 = pagina 0 * cantidad de elementos/paises 10
  const indexOfFisrtCountry = indexOfLastCountry - countriesPerPage; //0
  const currentCountries = data.slice(indexOfFisrtCountry, indexOfLastCountry);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container-paginate">
      <Render_Paginate
        countriesPerPage={countriesPerPage}
        allCountries={data.length}
        paginado={paginado}
      />

      {currentCountries.map((res, index) => {
        return (
          <div className={""} key={index}>
            <Card
              id={res.id}
              name={res.name}
              image={res.image}
              continent={res.continent}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Paginate;
