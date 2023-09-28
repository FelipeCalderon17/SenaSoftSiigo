import React, { useState, useEffect } from "react";

const EscribirJson = ({ nodosTabla, setNodosTabla }) => {
  const enviarJson = (e) => {
    e.preventDefault();
    let jsonData = e.target.data.value;
    console.log(jsonData);
    fetch("http://localhost:5000/api/crearRuta", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => {
        return response.json();
      })

      .then((response) => {
        if (response.resultado == true) {
          setNodosTabla(response.Ruta);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error en la insercion",
          });
        }
      });
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
