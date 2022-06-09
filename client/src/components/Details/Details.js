import React, { useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail } from "../../redux/actions/index.js";

import './Details.css';

function Details() {
  
  const dispatch = useDispatch();
  const paramas = useParams();
  const navigate = useNavigate();
  const detail = useSelector(state => state.detail)


useEffect(() => {
    let dogId = paramas.id;
    dispatch(getDetail(dogId))

    return () => {
      dispatch(resetDetail());
    }
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
                      <h1>Raza/nobre del perro: {e.name}</h1>
                      <h3>Altura: {e.height} Cm</h3>
                      {
                        e.weight ? <h3>Peso: {e.weight} Kg</h3>
                        : <h3>Peso no especificado</h3>
                      }
                      <h3>Temperamento: {e.temperament}</h3>
                      <h3>Años de vida: {e.yearsOfLife}</h3>
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
