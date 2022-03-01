import React from 'react';
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";

import Landing from '../pages/Landing/Landing';
import Home from '../components/Home/Home.js';
import Details from '../components/Details/Details.js';
import Form from '../components/Form/Form.js';


function Rutas() {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/detail/:id" element={<Details />} />
        <Route exact path="/activity/new" element={<Form />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}



export default Rutas;
