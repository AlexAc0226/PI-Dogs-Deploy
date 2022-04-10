import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const FILTER_BY_RAZA_DOG = "FILTER_BY_RAZA_DOG";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const GET_DETAIL = "GET_DETAIL";
export const ORDER_BY_NAME_DOG = "ORDER_BY_NAME_DOG";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const GET_NAME_DOG = "GET_NAME_DOG";
export const GET_TYPES_OF_TEMPERAMENTS = "GET_TYPES_OF_TEMPERAMENTS";
export const POST_DOG = "POST_DOG";

export function getDog() {
  return function (dispatch) {
    axios.get("http://localhost:3001/dogs").then(res => {
      dispatch({
        type: GET_DOGS,
        payload: res.data
      })
    }).catch((error)=> console.log(error)) 
  };
}

export function getNameDog(name) {
  return function(dispatch){
    axios.get(`http://localhost:3001/dogs?name=${name}`).then(res => {
      dispatch({
        type: GET_NAME_DOG,
        payload: res.data, 
      })
    }).catch(error => alert("El perro que usted a buscado no existe!!!"))
  }
}

export function getDetail(id) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/dogs/${id}`).then(res =>{
      dispatch({
        type: GET_DETAIL,
        payload: res.data,
      })
    }).catch(error => console.log(error))
  };
}

export function filterByRazaDog(payload) {
  return{
    type: FILTER_BY_RAZA_DOG,
    payload: payload
  }
}

export function filterByTemp(temp){
  return async function(dispatch){
    const r = await axios.get('http://localhost:3001/dogs/temp?temp=' + temp)
    dispatch({
      type: FILTER_BY_TEMPERAMENT,
      payload: r.data
    })
  }
}

export function getTemperament(){
  return function (dispatch) {
    axios.get("http://localhost:3001/temperament").then(res => {
      dispatch({
        type: GET_TYPES_OF_TEMPERAMENTS,
        payload: res.data
      })
    }).catch((error)=> console.log(error)) 
  };



}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME_DOG,
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
}

export function postCreateDog(payload) {
  return async function () {
    const createDog = await axios({
      url: "http://localhost:3001/dogs/create",
      method: "POST",
      data: payload
    });

    return {
      type: POST_DOG,
      payload: createDog,
    }
  }
}



