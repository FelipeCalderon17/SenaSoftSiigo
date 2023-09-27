import React, { useState, useEffect } from "react";

const AgregarNodo = ({ datos, setDatos }) => {
  //Metodo que almacenara los nodos en el localstorage

  const salvarLocal = (valoresFrm) => {
    //leemos la informacion del localstorage
    let elementos = JSON.parse(localStorage.getItem("nodos"));
    //agregamos al localstorage
    if (Array.isArray(elementos)) {
      elementos.push(valoresFrm); //verifica que sea  un arreglo y agrega un elemento al final
    } else {
      elementos = [valoresFrm]; //crea el arreglo local por primera vez
    }
    setDatos(elementos);
    localStorage.setItem("nodos", JSON.stringify(elementos));
    Swal.fire({
      icon: "success",
      title: "Nodo agregado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Metodo que obtiene la data del form, crea un objeto y setea el estado del componente
  const getDatosFrm = (e) => {
    e.preventDefault(); // para evitar la recarga automatica del form
    let nombreNodo = e.target.nombreNodo;
    let posx = e.target.posx;
    let posy = e.target.posy;
    let pesoNodo = e.target.pesoNodo;
    let conexionNodo = e.target.conexionNodo;
    let valoresFrm = {
      id: new Date().getTime(), //id randomico
      nombreNodo: nombreNodo.value,
      posx: posx.value,
      posy: posy.value,
      pesoNodo: pesoNodo.value,
      conexionNodo: conexionNodo.value,
    };
    setDatos(valoresFrm);
    salvarLocal(valoresFrm);
  };

  return (
    <>
      <button
        className="btn btn-dark sticky-top "
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        {" "}
        Agregar Destino
      </button>
      {
        //Inicio del offcanvas para agregar destino
      }
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            AGREGAR DESTINO
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={getDatosFrm}>
            <div>
              <div className="row mb-3">
                <div className="col-12">
                  <button onClick={(e) => {}}>ds</button>
                  <h5>Nombre: </h5>
                  <input
                    type="text"
                    placeholder="Ingrese el nombre del destino"
                    name="nombreNodo"
                    id="nombreNodo"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <h5>Posicion X: </h5>
                  <input
                    type="text"
                    name="posx"
                    id="posx"
                    placeholder="Ingrese la posicion X del destino"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <h5>Posicion Y: </h5>
                  <input
                    type="text"
                    name="posy"
                    id="posy"
                    placeholder="Ingrese la posicion Y del destino"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <h5>Peso: </h5>
                  <input
                    type="text"
                    name="pesoNodo"
                    id="pesoNodo"
                    placeholder="Ingrese el peso "
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-12">
                  <h5>Conexion: </h5>
                  <select
                    className="form-select"
                    name="conexionNodo"
                    id="conexionNodo"
                  >
                    <option value="">dsadas</option>
                  </select>
                </div>
              </div>
              <div className="row ">
                <div className="col-12 text-center">
                  <input
                    type="submit"
                    className="btn btn-primary w-50"
                    value={"Enviar"}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {
        //Fin del offcanvas para agregar destino
      }
    </>
  );
};

export default AgregarNodo;
