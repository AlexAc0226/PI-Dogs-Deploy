import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCountries } from "../../redux/actions/index";

import ReactPaginate from "react-paginate";

import Card from "../Card/Card.js";

import "./styles.css";

let PER_PAGE = 10;

function Paginate() {
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  let data = useSelector((state) => state.allCountries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  //number selected of the page
  function handlePageClick({ selected: selectedPage }) {
    //console.log(`selected: ${selectedPage}`);
    setCurrentPage(selectedPage);
  }

  //pagina actual * numero de elementos visibles en la pagina
  //0, 10, 20, 30, ...
  const offset = currentPage * PER_PAGE; //cantidad de elementos por cada pagina, ej: 100 * cada pagina(1 pagina)
  //console.log('offset: ' + offset);

  const currentPageData = data
    .slice(offset, offset + PER_PAGE) //*.slice(inicio, fin)
    .map((res, index) => (
      <div className="container" key={index}>
        <Card
          id={res.id}
          name={res.name}
          image={res.image}
          continent={res.continent}
        />
      </div>
    ));
  //console.log(`currentPageData: ${currentPageData}`); //nos devuelve la x cantidad de objetos por pagina

  //console.log(data); //data tiene TODOS los elementos que trae de la api

  //tatal of pages: 500
  const pageCount = Math.ceil(data.length / PER_PAGE);
  //console.log(pageCount); //cantidad total de paginas

  return (
    <div className="container-paginate">
      <h1 className="paginate-title">All countries</h1>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      {currentPageData}
    </div>
  );
}

export default Paginate;
