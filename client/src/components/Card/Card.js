import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card({ id, name, image, continent }) {
  return (
    <div className="card-container">
      <div className="img-container">
        <div className="div-image">
          <img src={image} alt="img fot found" />
        </div>
      </div>

      <div className="card-content">
        <div className="card-title">
          <h2>{name}</h2>
        </div>
        <div className="card-continent">
          <h3>{continent}</h3>
        </div>
      </div>

      <div className="btn">
        <Link to={`/detail/${id}`} className="link">
          <button className="card-btn">View more</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
