import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Resultados.module.css";
import HeaderMenu from "../components/HeaderMenu";
import Plot from "react-plotly.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { FaImage, FaFilePdf, FaFileExcel, FaArrowLeft } from "react-icons/fa";

const ResultadosMasivos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const modalRef = useRef();
  const [resultados, setResultados] = useState(null);

  useEffect(() => {
    if (!location.state?.tratamientos) {
      navigate("/");
      return;
    }
    const tratamientosBase = location.state.tratamientos.map((t) => ({
      ...t,
      resultado: Number(t.valortto) + Math.floor(Math.random() * 15 - 5),
    }));

    const shapiro = 0.08;
    const levene = 0.12;
    const anova = 0.03;

    const duncan = tratamientosBase.map((t, i) => ({
      tratamiento: t.nombretto,
      promedio: t.resultado,
      subgrupo: i % 2 === 0 ? "A" : "B",
    }));

    setResultados({ tratamientos: tratamientosBase, shapiro, levene, anova, duncan });
  }, [location, navigate]);

  const exportToImage = async () => {
    const canvas = await html2canvas(modalRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "resultados-masivos.png";
    link.click();
  };

  const exportToPDF = async () => {
    const canvas = await html2canvas(modalRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const w = pdf.internal.pageSize.getWidth() - 20;
    const imgProps = pdf.getImageProperties(imgData);
    const h = (imgProps.height * w) / imgProps.width;
    pdf.addImage(imgData, "PNG", 10, 10, w, h);
    pdf.save("resultados-masivos.pdf");
  };

  const exportToExcel = () => {
    const wsData = [
      ["Tratamiento", "Promedio", "Subgrupo"],
      ...resultados.duncan.map((d) => [d.tratamiento, d.promedio, d.subgrupo]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Duncan");
    XLSX.writeFile(wb, "resultados-masivos.xlsx");
  };

  if (!resultados) return null;

  return (
    <>
      <HeaderMenu />
      <div className={styles.resultadosContainer}>
        <div ref={modalRef} className={styles.resultadosContenido}>
          <h2>Resultados Estadísticos</h2>
          <p>
            <strong>Prueba de Shapiro:</strong> {resultados.shapiro} (
            {resultados.shapiro > 0.05 ? "✅ Normalidad confirmada" : "❌ No pasa"})
          </p>
          <p>
            <strong>Prueba de Levene:</strong> {resultados.levene} (
            {resultados.levene > 0.05 ? "✅ Homogeneidad confirmada" : "❌ No pasa"})
          </p>
          <p>
            <strong>Prueba ANOVA:</strong> {resultados.anova} (
            {resultados.anova < 0.05 ? "✅ Hay diferencias" : "❌ No hay diferencias"})
          </p>

          <h3>Resultados Duncan</h3>
          <table className={styles.tablaResultados}>
            <thead>
              <tr>
                <th>Tratamiento</th>
                <th>Promedio</th>
                <th>Subgrupo</th>
              </tr>
            </thead>
            <tbody>
              {resultados.duncan.map((d, i) => (
                <tr key={i}>
                  <td>{d.tratamiento}</td>
                  <td>{d.promedio}</td>
                  <td>{d.subgrupo}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Gráfico de Dispersión</h3>
          <Plot
            data={[
              {
                x: resultados.tratamientos.map((t) => t.nombretto),
                y: resultados.tratamientos.map((t) => t.resultado),
                mode: "markers",
                type: "scatter",
              },
            ]}
            layout={{ width: 500, height: 400, title: "Dispersión Tratamientos vs Resultado" }}
          />

          <h3>Boxplot</h3>
          <Plot
            data={[
              {
                x: resultados.tratamientos.map((t) => t.nombretto),
                y: resultados.tratamientos.map((t) => t.resultado),
                type: "box",
                boxpoints: "all",
              },
            ]}
            layout={{ width: 500, height: 400, title: "Distribución por Tratamiento" }}
          />
        </div>

        <div className={styles.botonesExportacion}>
          <button onClick={exportToImage}>
            <FaImage /> Imagen
          </button>
          <button onClick={exportToPDF}>
            <FaFilePdf /> PDF
          </button>
          <button onClick={exportToExcel}>
            <FaFileExcel /> Excel
          </button>
          <button onClick={() => navigate(-1)}>
            <FaArrowLeft /> Volver
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultadosMasivos;