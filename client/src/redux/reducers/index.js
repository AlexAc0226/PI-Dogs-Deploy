/* eslint-disable array-callback-return */
import {
  GET_COUNTRIES,
  GET_NAME_COUNTRY,
  GET_DETAIL,
  ORDER_BY_NAME_COUNTRY,
  ORDER_BY_POPULATION,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY
} from "../actions/index.js";

const initialState = {
  allCountries: [],
  countries: [],
  activities: [],
  detail: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        countries: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case ORDER_BY_NAME_COUNTRY:
      let copyCountriesName = [...state.allCountries]; 

      if (action.payload === "asc") {
        copyCountriesName.sort((countryFirst, coutrySecond) => {
          if (countryFirst.name < coutrySecond.name) return 1;
          if (countryFirst.name > coutrySecond.name) return -1;
          if (countryFirst.name === coutrySecond.name) return 0;
        });
      } else {
        copyCountriesName.sort((countryFirst, coutrySecond) => {
          if (countryFirst.name < coutrySecond.name) return -1;
          if (countryFirst.name > coutrySecond.name) return 1;
          if (countryFirst.name === coutrySecond.name) return 0;
        });
      }
      return {
        ...state,
        allCountries: [...copyCountriesName],
      };

      case ORDER_BY_POPULATION:
        let copyCountriesPopulation = [...state.allCountries]; 
  
        if (action.payload === "asc") {
          copyCountriesPopulation.sort((countryFirst, coutrySecond) => {
            if (countryFirst.population < coutrySecond.population) return 1;
            if (countryFirst.population > coutrySecond.population) return -1;
            if (countryFirst.population === coutrySecond.population) return 0;
          });
        } else {
          copyCountriesPopulation.sort((countryFirst, coutrySecond) => {
            if (countryFirst.population < coutrySecond.population) return -1;
            if (countryFirst.population > coutrySecond.population) return 1;
            if (countryFirst.population === coutrySecond.population) return 0;
          });
        }
        return {
          ...state,
          allCountries: [...copyCountriesPopulation],
        };

      case GET_NAME_COUNTRY: 
      return{
        ...state, allCountries: action.payload
      }

      case FILTER_BY_CONTINENT: 
      const allContinents = state.countries;
      const continentsFiltered = action.payload === "all" ? allContinents : allContinents.filter(e => e.continent === action.payload)

      return {...state, 
        allCountries: continentsFiltered }

      case FILTER_BY_ACTIVITY:
        return {...state, allCountries: action.payload}

    default:
      return {...state};
  }
}

export default rootReducer;