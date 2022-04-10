import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom' 

import { getDog, postCreateDog, getTemperament } from "../../redux/actions/index";

import "./Form.css";

function validate(e){
  let error = {};

  if(e.name === null || e.name === "" || e.name === undefined) error.name = 'Debe escribir un nombre para el perro';
  else if(!isNaN(e.name)) error.name = 'Solo se admite texto'

  if(e.heightMin < 0 || e.heightMin.includes("-")) error.heightMin = "Numeros, simbolos o letras no estan permitidos"
  else if(e.heightMin === "" || e.heightMin === null || e.heightMin === undefined ) error.heightMin = 'Debe escribir una altura minima para el perro'

  if(e.heightMax === "" || e.heightMax === null || e.heightMax === undefined ) error.heightMax = 'Debe escribir una altura maxima para el perro'
  else if(e.heightMax < 0 ) error.heightMax = "Numeros, simbolos o letras no estan permitidos"
  else if(parseInt(e.heightMax, 10) < parseInt(e.heightMin, 10)) error.heightMax = 'La altura maxima del perro no puede ser menor a la altura minima'

  if(e.weightMin < 0 ) error.weightMin = "Numeros, simbolos o letras no estan permitidos"
  else if(e.weightMin === "" || e.weightMin === null || e.weightMin === undefined ) error.weightMin = 'Debe escribir un peso minimo para el perro'

  if(e.weightMax < 0 ) error.weightMax = "Numeros, simbolos o letras no estan permitidos"
  else if(e.weightMax === "" || e.weightMax === null || e.weightMax === undefined ) error.weightMax = 'Debe escribir un peso maximo para el perro'
  else if(parseInt(e.weightMax, 10)  < parseInt(e.weightMin, 10)) error.weightMax = 'El peso maxima del perro no puede ser menor al peso minimo'

  
  if(e.yearOfLifeMin < 0 ) error.yearOfLifeMin = "Numeros, simbolos o letras no estan permitidos"
  else if(e.yearOfLifeMin === "" || e.yearOfLifeMin === null || e.yearOfLifeMin === undefined ) error.yearOfLifeMin = 'Debe escribir estimacion de vida minima para el perro'

  if(e.yearOfLifeMax < 0 ) error.yearOfLifeMax = "Numeros, simbolos o letras no estan permitidos"
  else if(e.yearOfLifeMax === "" || e.yearOfLifeMax === null || e.yearOfLifeMax === undefined ) error.yearOfLifeMax = 'Debe escribir estimacion de vida minima para el perro'
  else if(parseInt(e.yearOfLifeMax, 10 ) < parseInt(e.yearOfLifeMin, 10)) error.yearOfLifeMax = 'La estimació de vida maxima del perro no puede ser menor a la minima'



  if(e.temperament.length === "" || e.temperament.length === null || e.temperament.length === 0) error.temperament = 'Minimo debe seleccionar un temperamento'
  for(let i = 0; i < e.temperament.length; i++){
    for(let y = i + 1; y <= e.temperament.length; y++){
      if(e.temperament[i] === e.temperament[y]) error.temperament = "El temperamento selecionado ya fue seleccionado anteriormente"
    }
  }

  return error
}

function Form() {
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    yearOfLifeMin: "",
    yearOfLifeMax: "",
    temperament: [],
  });

  const [errors, setErrors] = useState({});
  const temps = useSelector((state) => state.temperaments)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getDog());
    dispatch(getTemperament())
  }, [dispatch]);

  
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

  function handleChangeheightMin(e){
    e.preventDefault();
    setInput(input => ({
      ...input, heightMin: e.target.value
    }))

    setErrors(validate({
      ...input, heightMin: e.target.value
    }))
  }
  
  function handleChangeheightMax(e){
    e.preventDefault();
    setInput(input => ({
      ...input, heightMax: e.target.value
    }))

    setErrors(validate({
      ...input, heightMax: e.target.value
    }))
  }

  function handleChangeweightMin(e){
    e.preventDefault();
    setInput(input => ({
      ...input, weightMin: e.target.value
    }))

    setErrors(validate({
      ...input, weightMin: e.target.value
    }))
  }

  function handleChangeweightMax(e){
    e.preventDefault();
    setInput(input => ({
      ...input, weightMax: e.target.value
    }))

    setErrors(validate({
      ...input, weightMax: e.target.value
    }))
  }

  function handleChangeLifeEstMin(e){
    e.preventDefault();
    setInput(input => ({
      ...input, yearOfLifeMin: e.target.value
    }))

    setErrors(validate({
      ...input, yearOfLifeMin: e.target.value
    }))
  }

  function handleChangeLifeEstMax(e){
    e.preventDefault();
    setInput(input => ({
      ...input, yearOfLifeMax: e.target.value
    }))

    setErrors(validate({
      ...input, yearOfLifeMax: e.target.value
    }))
  }

  function handleChangeTemperaments(e){
    e.preventDefault();
    setInput(input => ({
      ...input, temperament: [...new Set([...input.temperament, e.target.value])]
    }))
   
    setErrors(validate({
      ...input, temperament: [...input.temperament, e.target.value]
    }))
  }

  function handleSubmit(e){
    if (input.name && input.heightMin && input.heightMax && input.weightMin && input.weightMax && input.yearOfLifeMin && input.yearOfLifeMax && input.temperament.length > 0) {
      e.preventDefault();
      dispatch(postCreateDog(input));
      alert("Su perrito a sido creado!!!");
      
      setInput({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        yearOfLifeMin: "",
        yearOfLifeMax: "",
        temperament: []
      });

      navigate("/home");
    } else {
      e.preventDefault();
      alert("Debe completar todo los campos para finalizar la creacion...");
    }
  }

  function handleDeleteTemperament(e, temp){
    e.preventDefault();
    setInput((input)=> ({
      ...input, temperament: input.temperament.filter(e => e !== temp)
    }))
  }

  return (
    <div className="form-container">
      <h1>CREAR PERRO</h1>
      <form autocomplete="off" className="" onSubmit={(e)=> handleSubmit(e)}>

        {/*Nombre de la raza del perrito*/}
        <div>
          <label>Raza/nombre del perro: </label>
          <input
            className="controls"
            type="text"
            value={input.name}
            name="name"
            placeholder="Inserte el nombre/raza del perrito"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <br />

        {/*Altura del perro*/}
        <div>
          <label>Altura del perro: </label>
          <input className="controls" type="number" min="1" value={input.heightMin} name="heightMin" onChange={(e)=> handleChangeheightMin(e)} placeholder="Inserte la altura minima" />
          {errors.heightMin && <p className="error">{errors.heightMin}</p>}

          <input className="controls" type="number" min="1" value={input.heightMax} name="heightMax" onChange={(e)=> handleChangeheightMax(e)} placeholder="Inserte la altura maxima" />
          {errors.heightMax && <p className="error">{errors.heightMax}</p>}
        </div>
        <br />

        {/*Peso del perro*/}
        <div>
          <label>Peso del perro: </label>
          <input className="controls" type="number" min="1" value={input.weightMin} name="weightMin" onChange={(e)=> handleChangeweightMin(e)} placeholder="Inserte el peso minimo" />
          {errors.heightMin && <p className="error">{errors.weightMin}</p>}

          <input className="controls" type="number" min="1" max="150" value={input.weightMax} name="weightMax" onChange={(e)=> handleChangeweightMax(e)} placeholder="Inserte el peso maximo" />
          {errors.weightMax && <p className="error">{errors.weightMax}</p>}
        </div>
        <br />

        {/*Años de vida*/}
        <div>
          <label>Años de vida estimados : </label>
          <input className="controls" type="number" min="1" value={input.yearOfLifeMin} name="yearOfLifeMin" onChange={(e)=> handleChangeLifeEstMin(e)} placeholder="Cantidad de años minimos" />
          {errors.yearOfLifeMin && <p className="error">{errors.yearOfLifeMin}</p>}

          <input className="controls" type="number" min="1" value={input.yearOfLifeMax} name="yearOfLifeMax" onChange={(e)=> handleChangeLifeEstMax(e)} placeholder="Cantidad de años maxima" />
          {errors.yearOfLifeMax && <p className="error">{errors.yearOfLifeMax}</p>}
        </div>
        <br />

        {/*Select para añadir temperamentos*/}
        <div>
          <label>Temperamentos: </label>
          <select className="controls-temp" onChange={(e)=> handleChangeTemperaments(e)}>
            <option className="controls-temp" value="" hidden>
              Seleccione uno o varios temperamentos
            </option>
            {temps.map((e) => (
              <option value={e.name} key={e.id}>
                 {`${e.name}`}
              </option>
            ))}
          </select>
          {errors.temperament && <p className="error">{errors.temperament}</p>}
        </div>
        <br />

        {/*Lista de temperamentos*/}
        <div>
          <h3 className="add-temperament-h3">Temperamentos añadidos: </h3>
          <div className="container-temperament">
          {
            input.temperament.length !== 0 ? 
            input.temperament.map((temp, i) => (
              <div key={i}>
              <ul>
                    <li className="li-temp" onClick={(e)=> handleDeleteTemperament(e, temp)}>
                      <h3 className="font-h3">{temp}</h3>
                    </li>
              </ul>
              </div>
            )) : "Ninguno..."
          }
          </div>
          
        </div>

        <br></br>

        <div>
          <button className="botons" type="submit">CREAR</button>
        </div>
      </form>
    </div>
  );
}

export default Form;

