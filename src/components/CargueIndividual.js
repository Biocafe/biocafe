import React, { useState } from "react";
import styles from "../styles/CargueIndividual.module.css";
import HeaderMenu from "../components/HeaderMenu";
import { FaFlask, FaPlus, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CargueIndividual = () => {
  const [tratamientos, setTratamientos] = useState([
    { nombretto: "", valortto: "" },
  ]);
  const navigate = useNavigate();

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const nuevos = [...tratamientos];
    nuevos[index][name] = value;
    setTratamientos(nuevos);
  };

  const agregarTratamiento = () => {
    setTratamientos([...tratamientos, { nombretto: "", valortto: "" }]);
  };

  const validarCampos = () =>
    tratamientos.length >= 3 &&
    tratamientos.every((t) => t.nombretto && t.valortto);

  const handleMostrarResultado = () => {
    if (!validarCampos()) {
      alert("Debes ingresar mínimo 3 tratamientos completos con nombre y valor.");
      return;
    }
    navigate("/resultados", { state: { tratamientos } });
  };

  return (
    <div className={styles.container}>
      <HeaderMenu />
      <div className={styles.content}>
        <h1>
          <FaFlask className={styles.icon} /> Registro de Tratamientos
        </h1>
        {tratamientos.map((tto, index) => (
          <fieldset key={index} className={styles.fieldset}>
            <legend>
              <FaFlask /> Tratamiento #{index + 1}
            </legend>
            <input
              type="text"
              name="nombretto"
              placeholder="Nombre del tratamiento"
              value={tto.nombretto}
              onChange={(e) => handleChange(index, e)}
            />
            <input
              type="number"
              name="valortto"
              placeholder="Valor"
              value={tto.valortto}
              onChange={(e) => handleChange(index, e)}
            />
          </fieldset>
        ))}

        <button onClick={agregarTratamiento} className={styles.addBtn}>
          <FaPlus /> Agregar Tratamiento
        </button>
        <button
          className={styles.resultadoBtn}
          onClick={handleMostrarResultado}
        >
          <FaChartBar /> Resultado
        </button>
      </div>
    </div>
  );
};

export default CargueIndividual;