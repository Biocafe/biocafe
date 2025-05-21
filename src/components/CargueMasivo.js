import React, { useState, useRef } from "react";
import styles from "../styles/CargueMasivo.module.css";
import HeaderMenu from "../components/HeaderMenu";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { FaDownload, FaFileUpload, FaChartBar } from "react-icons/fa";

const CargueMasivo = () => {
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState([]);
  const [valido, setValido] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const excelData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      const rows = excelData.slice(7);

      const parsed = rows
        .filter((row) => row[1] && row[3])
        .map((row) => ({
          nombretto: row[1],
          valortto: row[3],
        }));

      if (parsed.length >= 3) {
        setFileName(file.name);
        setData(parsed);
        setValido(true);
        setMensaje("✔️ Datos válidos. Puedes continuar.");
      } else {
        setFileName("");
        setData([]);
        setValido(false);
        setMensaje(
          "⚠️ Debes ingresar al menos 3 tratamientos para continuar. Corrige el archivo y vuelve a cargarlo."
        );
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleMostrarResultados = () => {
    if (!valido) {
      alert(
        "Debes cargar al menos 3 tratamientos para realizar el análisis."
      );
      return;
    }
    navigate("/resultados-masivos", { state: { tratamientos: data } });
  };

  return (
    <div className={styles.container}>
      <HeaderMenu />
      <div className={styles.content}>
        <h1>Cargue Masivo de Tratamientos</h1>

        <p className={styles.instruction}>
          Encontrarás una plantilla en Excel para que llenes los datos de tus tratamientos.{" "}
          <strong>Recuerda</strong> que necesitas un mínimo de <strong>3 tratamientos</strong> para
          poder generar los resultados estadísticos.
        </p>

        <a
          href="/documentos/plantilla-cargue-masivo.xlsx"
          download
          className={styles.downloadBtn}
        >
          <FaDownload /> Descargar Plantilla Excel
        </a>

        <p className={styles.instruction}>
          Una vez completada, por favor sube tu archivo aquí:
        </p>

        <label className={styles.fileInputLabel}>
          <FaFileUpload /> Elegir archivo
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className={styles.fileInput}
          />
        </label>

        {fileName && (
          <p className={styles.fileName}>Archivo cargado: {fileName}</p>
        )}
        {mensaje && <p className={styles.alerta}>{mensaje}</p>}

        <button
          onClick={handleMostrarResultados}
          className={styles.resultadoBtn}
          disabled={!valido}
        >
          <FaChartBar /> Mostrar Resultado
        </button>
      </div>
    </div>
  );
};

export default CargueMasivo;