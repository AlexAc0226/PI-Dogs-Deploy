/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import "./Paginate.css";

function Render_Paginate({ dogsPerPage, allDogs, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
      <>
      {pageNumber &&
        pageNumber.map((number, index) => {
          return (
            <button className="paginate-btn" key={index}>
              <a onClick={() => paginado(number)}>{number}</a>
            </button>
          );
        })}
    </>
  );
}

export default Render_Paginate;
