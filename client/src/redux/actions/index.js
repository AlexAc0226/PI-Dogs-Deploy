import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const GET_DETAIL = "GET_DETAIL";
export const ORDER_BY_NAME_COUNTRY = "ORDER_BY_NAME_COUNTRY";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const GET_NAME_COUNTRY = "GET_NAME_COUNTRY";
export const GET_TYPES_OF_DIET = "GET_TYPES_OF_DIET";
export const POST_ACTIVITY = "POST_ACTIVITY";

export function getCountries() {
  return async function (dispatch) {
    try{
        var json = await axios.get("http://localhost:3001/countries");
        dispatch({
        type: GET_COUNTRIES,
        payload: json.data,
      })
    }catch(error){
      console.log(error)
    }
  };
}

export function getNameCountries(name) {
  return async function (dispatch) {
    try {
      const res = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      return dispatch({
        type: GET_NAME_COUNTRY,
        payload: res.data,
      });
    } catch (error) {
      alert("This country doesn't exist");
    }
  };
}


export function getDetail(id) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: res.data,
      });
    } catch (error) {
      alert("Id country not found");
    }
  };
}

export function filterByContinent(payload) {
  return{
    type: FILTER_BY_CONTINENT,
    payload: payload
  }
}

export function filterByActivity(payload) {
  return async function(dispatch){
    let info = await axios.get(`http://localhost:3001/activity?name=${payload}`)
    try{
      return dispatch({
        type: FILTER_BY_ACTIVITY,
        payload: info.data
      });
    }catch(error){
      alert("problema")
    }
    
  }
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME_COUNTRY,
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
}

export function postActivity(payload) {
  return async function () {
    const newActivity = await axios({
      url: "http://localhost:3001/activity/new",
      method: "POST",
      data: payload
    });

    return {
      type: POST_ACTIVITY,
      payload: newActivity,
    }
  }
}


