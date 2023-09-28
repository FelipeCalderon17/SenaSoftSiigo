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
import AgregarNodo from "./AgregarNodo";

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

const IndexBase = () => {
  let date = {
    labels: ["Punto A", "Punto B", "Punto C", "Punto D"],
    datasets: [
      {
        label: "Nodos",
        /*  data: [33, 53, 85, 41, 44, 65], */
        data: "",
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
  //Creamos el controlador para la data los nodos
  const [nodosData, setNodosData] = useState(date);
  //const [datosTabla, setDatosTabla] = useState(date);
  //creamos un controlador para mostrar el contenido del form abajo del navbar
  const [navbarControlador, setNavbarControlador] = useState(0);
  //0 = Agregar Destino  1 = Subir archivo  2 = Escribir archivo

  //Creamos la variable para almacenar en la base de datos
  const [datos, setDatos] = useState([]);
  const [nodosTabla, setNodosTabla] = useState({});

  const leerLS = () => {
    let nodos = JSON.parse(localStorage.getItem("nodos"));
    setDatos(nodos);
    console.log(nodos);
    return nodos;
  };

  () => {
    let ls = leerLS();
    console.log(date[0]);
  };

  useEffect(() => {
    console.log(nodosData);
    leerLS();
  }, []);
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
                  return (
                    <EscribirJson
                      nodosTabla={nodosTabla}
                      setNodosTabla={setNodosTabla}
                      nodosData={nodosData}
                      setNodosData={setNodosData}
                    ></EscribirJson>
                  );
                } else {
                  return (
                    <AgregarNodo
                      datos={datos}
                      setDatos={setDatos}
                    ></AgregarNodo>
                  );
                }
              }
            })()}
          </div>
          <div className="row bg-white mt-5  mx-0 my-0">
            <button
              onClick={() => {
                console.log(nodosData);
              }}
            >
              {" "}
              dsds
            </button>
            <h1 className="text-center mt-3">RUTAS</h1>
            <div className="col-10 m-auto d-flex justify-content-center   pb-4">
              <Scatter data={nodosData}></Scatter>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexBase;
