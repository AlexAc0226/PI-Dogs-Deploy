import React from 'react';
import { Link } from "react-router-dom";
import "./Landing.css";


function Landing() {
  return (
    <div className="container_landing">
        <div>
          <h1 className="title_landing">Dog App</h1>
        </div>
        <div>
          <Link className="link_landing" to="/home">
            WELCOME
          </Link>
      </div>
  </div>
  )
}

export default Landing;
