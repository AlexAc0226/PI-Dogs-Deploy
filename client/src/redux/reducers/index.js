/* eslint-disable array-callback-return */
import {
  GET_DOGS,
  GET_NAME_DOG,
  GET_DETAIL,
  ORDER_BY_NAME_DOG,
  ORDER_BY_WEIGHT,
  FILTER_BY_RAZA_DOG,
  FILTER_BY_TEMPERAMENT,
  GET_TYPES_OF_TEMPERAMENTS,
  RESET_DOG
} from "../actions/index.js";

const initialState = {
  allDogs: [],
  dogs: [],
  temperaments: [],
  detail: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        dogs: action.payload,
      };

      case GET_TYPES_OF_TEMPERAMENTS:
        return {
          ...state, temperaments: action.payload
        }

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case ORDER_BY_NAME_DOG:
      let copydogsName = [...state.allDogs];

      if (action.payload === "asc") {
        copydogsName.sort((dogFirst, dogSecond) => {
          if (dogFirst.name < dogSecond.name) return 1;
          if (dogFirst.name > dogSecond.name) return -1;
          if (dogFirst.name === dogSecond.name) return 0;
        });
      } else {
        copydogsName.sort((dogFirst, dogSecond) => {
          if (dogFirst.name < dogSecond.name) return -1;
          if (dogFirst.name > dogSecond.name) return 1;
          if (dogFirst.name === dogSecond.name) return 0;
        });
      }
      return {
        ...state,
        allDogs: [...copydogsName],
      };

    case ORDER_BY_WEIGHT:
      let copydogsWeight = [...state.allDogs];

      if (action.payload === "asc") {
        copydogsWeight.sort((dogFirst, dogSecond) => {
          if (dogFirst.weight < dogSecond.weight) return 1;
          if (dogFirst.weight > dogSecond.weight) return -1;
          if (dogFirst.weight === dogSecond.weight) return 0;
        });
      } else {
        copydogsWeight.sort((dogFirst, dogSecond) => {
          if (dogFirst.weight < dogSecond.weight) return -1;
          if (dogFirst.weight > dogSecond.weight) return 1;
          if (dogFirst.weight === dogSecond.weight) return 0;
        });
      }
      return {
        ...state,
        allDogs: [...copydogsWeight],
      };

    case GET_NAME_DOG:
      return {
        ...state,
        allDogs: action.payload,
      };

    case FILTER_BY_RAZA_DOG:
    const allRazaDogs = state.dogs;
      const razasFiltered =
        action.payload === "all"
          ? allRazaDogs
          : allRazaDogs.filter((e) => e.name.includes(action.payload)); 

      return { ...state, allDogs: razasFiltered };

    case FILTER_BY_TEMPERAMENT:
      return {...state, allDogs: action.payload}  
    
       case RESET_DOG: return{
            ...state, detail: null
        }

    default:
      return { ...state };
  }
}


export default rootReducer;