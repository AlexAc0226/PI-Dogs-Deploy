import React, { useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/index.js";

import './Details.css';

function Details() {
  
  const dispatch = useDispatch();
  const paramas = useParams();
  const navigate = useNavigate();
  const detail = useSelector(state => state.detail)


useEffect(() => {
    let countryId = paramas.id;
    dispatch(getDetail(countryId))
  }, [dispatch, paramas.id]);

  const navegation = () => {
    navigate("/home");
  };


  return (
    <div className="all-detail-container">
      <div className="btn-and-title">
        <div className="container-detail-btn">
          <button onClick={navegation} className="btn-detail">← Back</button>
          <h1 className="detail-title">Details</h1>
        </div>
      </div>
      {
        detail ? (
          detail.map((e, i) => (
            <div key={i} className="">
            
              <div className="detail-container">
                  <div className="detail-img">
                    <img src={e.image} alt="img not fond" />
                    </div>

                  <div className="detail-data">
                      <h1>Title: {e.name}</h1>
                      <h2>Code the country: {e.id}</h2>
                      <h3>Capital: {e.capital}</h3>
                      <h3>Subregión: {e.subregion}</h3>
                      <h3>Area: {e.area}</h3>
                      <h3>Population: {e.population}</h3>
                    </div>
                 
                  <div className="detail-list_activities">
                    <h1>LISTA DE ACTIVIDADES</h1>
                    {
                      e.tourist_activities.length ? 
                      e.tourist_activities.map((c, i) => (
                        <div key={i}>
                          <h2>Type of the activity: {c.type.replace(/_/g, " ")}</h2>
                          <h2>Name of the activity: {c.name}</h2>
                          <h2>Duration of the activity: {c.duration} hour/s</h2>
                          <h2>Difficulty of the activity: {c.difficulty}</h2>
                          <h2>Season: {c.season}</h2>
                          <br/><br/>
                      </div>
                      )) 
                      : 
                      <h2>No hay actividades creadas para este pais</h2>
                    }
                    </div>

              </div>


            </div>
          ))
        ) : (
          <p>Loading...</p>
        ) 
      }
    </div>
  );
}

export default Details
