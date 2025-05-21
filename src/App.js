import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import Home from "./components/Home";
import CargueMasivo from "./components/CargueMasivo";
import CargueIndividual from "./components/CargueIndividual";
import Resultados from "./components/Resultados";
import ResultadosMasivos from "./components/ResultadosMasivos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cargue-masivo" element={<CargueMasivo />} />
        <Route path="/cargue-individual" element={<CargueIndividual />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/resultados-masivos" element={<ResultadosMasivos />} />
      </Routes>
    </Router>
  );
}

export default App;