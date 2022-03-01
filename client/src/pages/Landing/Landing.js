import React from 'react';
import { Link } from "react-router-dom";
import s from "./landing.module.css";


function Landing() {
  return (
    <div className={s.contenedor}>
        <div className={s.contenedor_landing}>
          <h1 className={s.title_landing}>Countries App</h1>
        </div>
        <div className={s.contenedor_landing}>
          <Link className={s.link} to="/home">
            WELCOME
          </Link>
      </div>
  </div>
  )
}

export default Landing;
