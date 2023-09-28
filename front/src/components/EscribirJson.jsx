import React, { useState, useEffect } from "react";

const EscribirJson = ({ nodosTabla, setNodosTabla }) => {
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
              data.push("{ x: " + newArray[0] + ", y:" + newArray[1] + " },");
            }
            console.log(newArray);
            console.log(data);
            let newData = [];
            for (let i = 0; i < data.length; i++) {
              newData.push(data[i].replace('"', ""));
            }
            console.log(newData[2]);
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
