import React, { useState, useEffect } from "react";
//importamos el ccs para el index
import "../assets/css/bootstrap.min.css";
import "../assets/css/style2.css";
//importamos el JS para el index
import "https://cdn.jsdelivr.net/npm/sweetalert2@11";
//importamos los componentes que seran hijos del Index
import Navbar from "./Navbar";
import SubirJson from "./SubirJson";
import EscribirJson from "./EscribirJson";
import Mapa from "./Mapa";

//importacion de la libreria chart.js

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const datos = {
  labels: ["Punto A", "Punto B", "Punto C", "Punto D"],
  datasets: [
    {
      label: "First dataset",
      /*  data: [33, 53, 85, 41, 44, 65], */
      data: [
        { x: 4, y: 62 },
        { x: 8, y: 6 },
        { x: 13, y: 46 },
        { x: 17, y: 2 },
      ],

      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    /*   {
          label: "Second dataset",
          data: [33, 25, 35, 51, 54, 76],
          fill: false,
          borderColor: "#742774",
        }, */
  ],
};

const IndexBase = () => {
  //creamos un controlador para mostrar el contenido del form abajo del navbar
  const [navbarControlador, setNavbarControlador] = useState(0);
  //0 = Agregar Destino  1 = Subir archivo  2 = Escribir archivo

  useEffect(() => {}, []);
  return (
    <>
      <div classNameName="container-fluid bg-white p-0">
        <Navbar
          navbarControlador={navbarControlador}
          setNavbarControlador={setNavbarControlador}
        ></Navbar>
        <div
          className="container-fluid bg-primary sticky-top"
          data-wow-delay="0.1s"
          style={{ padding: "35px" }}
        >
          <div className="container">
            {(() => {
              //Desicion para controlar el contenido del div de interacciones
              if (navbarControlador == 1) {
                return <SubirJson></SubirJson>;
              } else {
                if (navbarControlador == 2) {
                  return <EscribirJson></EscribirJson>;
                } else {
                  return (
                    <>
                      <button
                        className="btn btn-dark"
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
                          <h5
                            className="offcanvas-title"
                            id="offcanvasExampleLabel"
                          >
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
                          <form action="">
                            <div>
                              <div className="row mb-3">
                                <div className="col-12">
                                  <h5>Nombre: </h5>
                                  <input
                                    type="text"
                                    placeholder="Ingrese el nombre del destino"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="row mb-3">
                                <div className="col-12">
                                  <h5>Posicion X: </h5>
                                  <input
                                    type="text"
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
                                    placeholder="Ingrese el peso "
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="row mb-5">
                                <div className="col-12">
                                  <h5>Conexion: </h5>
                                  <select className="form-select" name="" id="">
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
                }
              }
            })()}
          </div>
        </div>
        <div className="row bg-white sticky-top mx-0 my-0">
          <h1 className="text-center mt-3">RUTAS</h1>
          <div className="col-8 m-auto d-flex justify-content-center  pb-4">
            <Scatter data={datos}></Scatter>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexBase;
