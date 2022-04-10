import React from 'react';
import { Link } from "react-router-dom";
import "./Landing.css";


function Landing() {
  return (
    <div className="container_landing">
        <div>
          <h1 className="title_landing">PerriPedia</h1>
        </div>
        <div>
          <Link className="ov-btn-grow-spin" to="/home">
            BIENVENID@
           
          </Link>
      </div>
  </div>
  )
}

export default Landing;
