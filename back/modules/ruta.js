const graphlib = require("graphlib");

//Paquetes requeridos
const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre sitio
const ruta = express.Router();
//middlewares requeridos
//middlewares: traductor de datos entre aplicaciones distribuidas
ruta.use(express.json()); //serializa la data en json
ruta.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
ruta.options("*", cors()); //Configura las ip admitidas por cors, * == todas
//Verbo GET LISTAR
ruta.get("/api/crearRuta", (req, res) => {
  fetch("../rutas.json")
    .then((response) => {
      return response.json();
    })
    //Accion a desarrollar con el archivo leido y parseado
    .then((data) => {
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

      const destino = "X"; // Cambia esto a la ubicación de destino deseada
      const rutaOptima = encontrarRutaOptima(data, destino);

      console.log("Ruta óptima:", rutaOptima);
    });
});

module.exports = ruta;
