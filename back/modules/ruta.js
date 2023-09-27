//Paquetes requeridos
const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre sitio
const ruta = express.Router();

//middlewares requeridos
//middlewares: traductor de datos entre aplicaciones distribuidas
ruta.use(express.json()); //serializa la data en json
ruta.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
ruta.options("*", cors()); //Configura las ip admitidas por cors, * == todas
//Funcion para crear la ruta
function encontrarRutaMasEficiente(jsonData) {
  const { ubicaciones, conexiones, inicio } = jsonData;

  // Crear un grafo a partir de las conexiones
  const grafo = {};
  conexiones.forEach((conexion) => {
    const { ubicacion1, ubicacion2, peso } = conexion;
    if (!grafo[ubicacion1]) {
      grafo[ubicacion1] = {};
    }
    if (!grafo[ubicacion2]) {
      grafo[ubicacion2] = {};
    }
    grafo[ubicacion1][ubicacion2] = peso;
    grafo[ubicacion2][ubicacion1] = peso;
  });

  // Encontrar todos los nodos conectados
  const nodosConectados = new Set();
  nodosConectados.add(inicio);

  const rutaActual = [];

  function encontrarRutaActual(nodoActual, visitados) {
    visitados.add(nodoActual);
    const ubicacion = ubicaciones.find((ubicacion) => ubicacion.nombre === nodoActual);
    if (ubicacion) {
      rutaActual.push({ nombre: nodoActual, posX: ubicacion.posX, posY: ubicacion.posY });
    }

    // Buscar el nodo no visitado más cercano
    for (const vecino in grafo[nodoActual]) {
      if (!visitados.has(vecino)) {
        encontrarRutaActual(vecino, visitados);
      }
    }
  }

  encontrarRutaActual(inicio, nodosConectados);

  // Encontrar nodos sin conexión
  const nodosSinConexion = ubicaciones
    .filter((ubicacion) => ubicacion.nombre !== inicio && !nodosConectados.has(ubicacion.nombre))
    .map((ubicacion) => ({ nombre: ubicacion.nombre, posX: ubicacion.posX, posY: ubicacion.posY }));

  return {
    rutaMasEficiente: rutaActual,
    nodosSinConexion: nodosSinConexion,
  };
}

//Verbo POST PARA CREAR LA RUTA
ruta.post("/api/crearRuta", (req, res) => {
  const jsonData = req.body;
  const resultado = encontrarRutaMasEficiente(jsonData);
  return res.send({
    Ruta: resultado.rutaMasEficiente.map((nodo) => `${nodo.nombre} ((${nodo.posX}), (${nodo.posY}))`).join(" -> "),
    "Nodos sin conexion": resultado.nodosSinConexion.map((nodo) => `${nodo.nombre} ((${nodo.posX}), (${nodo.posY}))`).join(", "),
  });
});

module.exports = ruta;
