import React, { useState, useEffect } from "react";

const EscribirJson = ({
  nodosTabla,
  setNodosTabla,
  nodosData,
  setNodosData,
}) => {
  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  const enviarJson = (e) => {
    e.preventDefault();
    let jsonData = e.target.data.value;
    jsonData = jsonData.trim();
    if (isJson(jsonData)) {
      jsonData = JSON.parse(e.target.data.value);
      console.log(jsonData);
      fetch("http://localhost:5000/api/crearRuta", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.resultado == true) {
            setNodosTabla(response.Ruta);
            let array = response.Ruta.split("->");
            let ubicaciones = [];
            for (let i = 0; i < array.length; i++) {
              let posX = array[i].split("X");
              let posY = array[i].split("Y");
              ubicaciones.push(posX[1] + "|" + posY[1]);
            }
            let newArray = [];
            let data = [];
            for (let i = 0; i < ubicaciones.length; i++) {
              newArray = ubicaciones[i].split("|");
              data.push(
                { "x":   newArray[0]  , "y":  newArray[1] }
              );
            }
            
            console.log(data);
            console.log(typeof data);
            
            let date = {
              labels: ["Punto A", "Punto B", "Punto C", "Punto D"],
              datasets: [
                {
                  label: "Nodos",
                  /*  data: [33, 53, 85, 41, 44, 65], */
                  data: data,
                  responsive: true,
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "rgba(75,192,192,1)",
                  showLine: true,
                },
                /*   {
                      label: "Second dataset",
                      data: [33, 25, 35, 51, 54, 76],
                      fill: false,
                      borderColor: "#742774",
                    }, */
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El JSON proporcionado no es valido",
      });
    }
  };

  return (
    <>
      <form onSubmit={enviarJson} className="d-flex">
        <div className="col-md-10">
          <div className="row g-2">
            <div className="col-md-2 align-self-center">
              <h5>Escribir JSON:</h5>
            </div>
            <div className="col-md-9">
              <textarea
                style={{ resize: "none" }}
                rows="5"
                id="data"
                name="data"
                className="form-control border-0 w-100"
                placeholder="Escribir JSON"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="col-md-2 align-self-center">
          <button className="btn btn-dark border-0 w-100">Enviar</button>
        </div>
      </form>
    </>
  );
};

export default EscribirJson;
