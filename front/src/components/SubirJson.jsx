import React, { useState, useEffect } from "react";
import "chartjs-plugin-datalabels";

const SubirJson = ({ nodosTabla, setNodosTabla, nodosData, setNodosData }) => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const enviarJson = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Por favor, seleccione un archivo JSON.");
      return;
    }

    const formData = new FormData();
    formData.append("file0", file); // El nombre del campo debe coincidir con el nombre configurado en el servidor

    try {
      const response = await fetch("http://localhost:5000/api/uploadJson", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        let ruta = data.datos;
        console.log(ruta);
        /* ruta = ruta.trim(); */
        console.log(ruta);
        fetch("http://localhost:5000/api/crearRuta", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(ruta),
        })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.resultado == true) {
              let array = response.Ruta.split("->");
              let ubicaciones = [];
              for (let i = 0; i < array.length; i++) {
                let posX = array[i].split("X");
                let posY = array[i].split("Y");
                ubicaciones.push(posX[1] + "|" + posY[1]);
              }
              const labels = array.map((_, index) => `Punto ${index + 1}`);
              let newArray = [];
              let data = [];
              for (let i = 0; i < ubicaciones.length; i++) {
                newArray = ubicaciones[i].split("|");
                data.push({ x: newArray[0], y: newArray[1] });
              }
              // Renderiza el gráfico después de cargar la imagen de fondo
              renderChartWithBackground(labels, data);
              let date = {
                labels: labels,
                datasets: [
                  {
                    label: "Nodos",
                    /*  data: [33, 53, 85, 41, 44, 65], */
                    data: data,
                    responsive: true,
                    pointRadius: 8,
                    pointBackgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                    showLine: true,
                  },
                ],
              };
              setNodosData(date);
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error en la insercion",
              });
            }
          });
      } else {
        alert("Error al subir el archivo JSON.");
      }
    } catch (error) {
      console.error("Error en la solicitud fetch:", error);
    }
  };
  return (
    <>
      <form action="" onSubmit={enviarJson} className="d-flex">
        <div className="col-md-10">
          <div className="row g-2">
            <div className="col-md-2 ">
              <h5>Subir JSON:</h5>
            </div>
            <div className="col-md-9">
              <input
                type="file"
                id="json"
                className="form-control border-0 w-100"
                placeholder="Archivo JSON"
                accept=".json,.JSON"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <input type="submit" className="btn btn-dark border-0 w-100" value="Enviar" />
        </div>
      </form>
    </>
  );
};

export default SubirJson;
