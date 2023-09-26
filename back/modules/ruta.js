const graphlib = require("graphlib");

//Paquetes requeridos
const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre sitio
const ruta = express.Router();
const data = {
  ubicaciones: [
    { nombre: "A", posX: 20, posY: 20 },
    { nombre: "B", posX: 45, posY: 60 },
    { nombre: "C", posX: 79, posY: 90 },
    { nombre: "D", posX: 56, posY: 79 },
    { nombre: "E", posX: 57, posY: 69 },
    { nombre: "F", posX: 58, posY: 88 },
    { nombre: "G", posX: 59, posY: 89 },
  ],
  conexiones: [
    { ubicacion1: "A", ubicacion2: "B", peso: 2 },
    { ubicacion1: "A", ubicacion2: "C", peso: 6 },
    { ubicacion1: "B", ubicacion2: "D", peso: 5 },
    { ubicacion1: "C", ubicacion2: "D", peso: 8 },
    { ubicacion1: "D", ubicacion2: "E", peso: 15 },
    { ubicacion1: "D", ubicacion2: "F", peso: 10 },
    { ubicacion1: "E", ubicacion2: "G", peso: 6 },
    { ubicacion1: "F", ubicacion2: "G", peso: 2 },
  ],
  inicio: "C",
};

//middlewares requeridos
//middlewares: traductor de datos entre aplicaciones distribuidas
ruta.use(express.json()); //serializa la data en json
ruta.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
ruta.options("*", cors()); //Configura las ip admitidas por cors, * == todas
//Verbo GET LISTAR
ruta.get("/api/crearRuta", (req, res) => {
  function encontrarRutaOptima(data, destino) {
    const ubicaciones = data.ubicaciones;
    const conexiones = data.conexiones;
    const inicio = data.inicio;

    const distancias = {};
    const prev = {};
    const noVisitadas = [];

    // Inicialización
    ubicaciones.forEach((ubicacion) => {
      distancias[ubicacion.nombre] = ubicacion.nombre === inicio ? 0 : Infinity;
      prev[ubicacion.nombre] = null;
      noVisitadas.push(ubicacion.nombre);
    });

    while (noVisitadas.length) {
      const nodoActual = noVisitadas.reduce((min, ubicacion) => (distancias[ubicacion] < distancias[min] ? ubicacion : min));

      noVisitadas.splice(noVisitadas.indexOf(nodoActual), 1);

      if (nodoActual === destino) {
        const ruta = [];
        let actual = destino;
        while (actual) {
          ruta.unshift(actual);
          actual = prev[actual];
        }
        return ruta;
      }

      const vecinos = conexiones.filter((conexion) => conexion.ubicacion1 === nodoActual).map((conexion) => conexion.ubicacion2);

      vecinos.forEach((vecino) => {
        const distancia = distancias[nodoActual] + pesoDeConexion(nodoActual, vecino);
        if (distancia < distancias[vecino]) {
          distancias[vecino] = distancia;
          prev[vecino] = nodoActual;
        }
      });
    }
    return null; // No se encontró una ruta
  }

  function pesoDeConexion(ubicacion1, ubicacion2) {
    const conexion = data.conexiones.find(
      (c) => (c.ubicacion1 === ubicacion1 && c.ubicacion2 === ubicacion2) || (c.ubicacion1 === ubicacion2 && c.ubicacion2 === ubicacion1)
    );
    return conexion ? conexion.peso : Infinity;
  }

  const destino = "G"; // Cambia esto a la ubicación de destino deseada
  const rutaOptima = encontrarRutaOptima(data, destino);

  console.log("Ruta óptima:", rutaOptima);
  res.send({ "Ruta optima": rutaOptima });
});

module.exports = ruta;
