import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom' 

import { getCountries, postActivity } from "../../redux/actions/index";

import "./Form.css";

function validate(e){
  let error = {};

  if(e.type === null || e.type === "" || e.type === undefined) error.type = "You need to enter a type of activity"

  if(e.name === null || e.name === "" || e.name === undefined) error.name = 'You must write an activity name';
  else if(!isNaN(e.name)) error.name = 'Text only is supported'

  if(e.difficulty === "" || e.difficulty === null || e.difficulty.length < 1 || e.difficulty === undefined) error.difficulty = 'You must write an difficulty'

  if(e.duration < 0 || e.duration.includes("-")) error.duration = "Negative symbols, letters and numbers are not allowed"
  else if(e.duration === "" || e.duration === null || e.duration === undefined ) error.duration = 'You must write an duration'

  if(e.season === "" || e.season === null || e.season === undefined) error.season = 'You must write an season'

  if(e.countryId.length === "" || e.countryId.length === null || e.countryId.length === 0) error.countryId = 'Minimum one country required'
  for(let i = 0; i < e.countryId.length; i++){
    for(let y = i + 1; y <= e.countryId.length; y++){
      if(e.countryId[i] === e.countryId[y]) error.countryId = "The countries are repeated"
    }
  }

  return error
}

function Form() {
  const [input, setInput] = useState({
    type: "",
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryId: [],
  });

  const [errors, setErrors] = useState({});
  const data = useSelector((state) => state.allCountries);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleChangeActivities(e) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      //type: [...input.type, e.target.value] //va insertando nuevos elementos dentro de un array
      //type: [e.target.value] //solo inserta UN elemento dentro de un array
      type: e.target.value //solo le inserta UN elemento a estado, y NOOO va dentro de un array, es un string comun y corriente
    }));

    setErrors(validate({
      ...input, type: e.target.value
    }))
  }

  function handleChangeDifficulty(e){
    e.preventDefault();
    setInput(input => ({
      ...input, difficulty: e.target.value
    }))

    setErrors(validate({
      ...input, difficulty: e.target.value
    }))
  }

  function handleChangeDuration(e){
    e.preventDefault();
    setInput(input => ({
      ...input, duration: e.target.value
    }))

    setErrors(validate({
      ...input, duration: e.target.value
    }))
  }

  function handleChangeSeason(e){
    e.preventDefault();
    setInput(input => ({
      ...input, season: e.target.value
    }))

    setErrors(validate({
      ...input, season: e.target.value
    }))
  }

  function handleChangeCountries(e){
    e.preventDefault();
    setInput(input => ({
      ...input, countryId: [...new Set([...input.countryId, e.target.value])]
    }))
   
    setErrors(validate({
      ...input, countryId: [...input.countryId, e.target.value]
    }))
  }

  function handleChange(e) {
    e.preventDefault();
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value
    }))

    setErrors(validate({
      ...input, [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(e){
    if (input.type && input.name && input.difficulty && input.duration && input.season && input.countryId.length > 0) {
      e.preventDefault();
      dispatch(postActivity(input));
      alert("Activity succesfully Created!!");
      
      setInput({
        type: "",
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countryId: []
      });
      navigate("/home");
    } else {
      e.preventDefault();
      alert("You must complete every field!!");
    }
  }

  function handleDeleteCountry(e, country){
    e.preventDefault();
    setInput((input)=> ({
      ...input, countryId: input.countryId.filter(e => e !== country)
    }))
  }

  //console.log(input);

  return (
    <div className="container-form">
      <h1>Create activity</h1>
      <form className="form" onSubmit={(e)=> handleSubmit(e)}>
        <div>
          <label>Tourist activit: </label>
          <select onChange={(e) => handleChangeActivities(e)}>
            <option value="" hidden>
              Tourist activity
            </option>
            <option value="business">TURISMO DE NEGOCIOS</option>
            <option value="urban">TURISMO URBANO</option>
            <option value="natural">TURISMO NATURAL</option>
            <option value="conventional">TURISMO CONVENCIONAL</option>
            <option value="no_conventional">TURISMO NO CONVENCIONAL</option>
            <option value="gastronomic">TURISMO GASTRONÓMICO</option>
            <option value="advanture">TURISMO DE AVENTURA</option>
            <option value="ecological">TURISMO ECOLÓGICO</option>
            <option value="cultural">TURISMO CULTURAL</option>
            <option value="health">TURISMO DE SALUD</option>
            <option value="sports">TURISMO DEPORTIVO</option>
            <option value="sun_and_beach">TURISMO DE SOL Y PLAYA</option>
            <option value="solidary">TURISMO SOLIDARIO</option>
            <option value="shopping">TURISMO DE COMPRAS</option>
            <option value="luxury">TURISMO DE LUJO</option>
          </select>
          {errors.type && <p className="error">{errors.type}</p>}
        </div>

        <div>
          <label>Name of the activity: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder="Title"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Difficulty: </label>
          <select onChange={(e)=> handleChangeDifficulty(e)}>
            <option value="" hidden>
              Selected difficulty
            </option>
            <option value="1">Difficulty 1</option>
            <option value="2">Difficulty 2</option>
            <option value="3">Difficulty 3</option>
            <option value="4">Difficulty 4</option>
            <option value="5">Difficulty 5</option>
          </select>
          {errors.difficulty && <p className="error">{errors.difficulty}</p>}
        </div>

        <div>
          <label>Duration of the activity: </label>
          <input type="number" min="1" value={input.duration} name="duration" onChange={(e)=> handleChangeDuration(e)} placeholder="Enter the number of hours" />
          {errors.duration && <p className="error">{errors.duration}</p>}
        </div>

        <div>
          <label>Season: </label>
          <select onChange={(e)=> handleChangeSeason(e)}>
            <option value="" hidden>
              Selected season
            </option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="fall">Fall</option>
            <option value="spring">Spring</option>
          </select>
          {errors.season && <p className="error">{errors.season}</p>}
        </div>

        <div>
          <label>Countries: </label>
          <select onChange={(e)=> handleChangeCountries(e)}>
            <option value="" hidden>
              Select a country
            </option>
            {data.map((e) => (
              <option value={e.id} key={e.id}>
                 {`${e.id} - ${e.name}`}
              </option>
            ))}
          </select>
          {errors.countryId && <p className="error">{errors.countryId}</p>}
        </div>

        <div>
          <h3>Lista de paises: </h3>
          {
            input.countryId !== 0 ? 
            input.countryId.map((element, i) => (
              <ul key={i}>
                    <li>{element}</li>
                    <button onClick={(e)=> handleDeleteCountry(e, element)}>Delete</button>
                  </ul>
            )) : ""
          }
        </div>

        <br></br>

        <div>
          <button type="submit">Create activity</button>
        </div>
      </form>
    </div>
  );
}

export default Form;

