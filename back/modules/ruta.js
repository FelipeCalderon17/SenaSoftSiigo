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
function findShortestTSPRoute(jsonData) {
  const { ubicaciones, conexiones, inicio } = jsonData;
  const locations = new Map();
  const graph = {};

  // Construir el grafo a partir de los datos JSON
  ubicaciones.forEach((ubicacion) => {
    const { nombre, posX, posY } = ubicacion;

    locations.set(nombre, { posX, posY });

    if (!graph[nombre]) {
      graph[nombre] = {};
    }
  });

  conexiones.forEach((conexion) => {
    const { ubicacion1, ubicacion2, peso } = conexion;

    graph[ubicacion1][ubicacion2] = peso;
    graph[ubicacion2][ubicacion1] = peso;
  });

  // Función para encontrar el nodo no visitado más cercano
  function findNearestUnvisitedNode(currentLocation, unvisitedLocations) {
    let nearestNeighbor = null;
    let minDistance = Infinity;

    for (const location of unvisitedLocations) {
      if (graph[currentLocation][location] < minDistance) {
        nearestNeighbor = location;
        minDistance = graph[currentLocation][location];
      }
    }

    return nearestNeighbor;
  }

  const visitedLocations = new Set();
  let currentLocation = inicio;
  visitedLocations.add(currentLocation);
  const path = [{ nombre: currentLocation, ...locations.get(currentLocation) }];

  while (visitedLocations.size < locations.size) {
    const unvisitedLocations = new Set([...locations.keys()].filter((loc) => !visitedLocations.has(loc)));
    const nearestNeighbor = findNearestUnvisitedNode(currentLocation, unvisitedLocations);

    if (nearestNeighbor) {
      path.push({ nombre: nearestNeighbor, ...locations.get(nearestNeighbor) });
      visitedLocations.add(nearestNeighbor);
      currentLocation = nearestNeighbor;
    } else {
      // Si no se encuentra un vecino no visitado, regresar al inicio
      const unvisitedLocationArray = [...unvisitedLocations];
      currentLocation = unvisitedLocationArray[0];
      path.push({ nombre: currentLocation, ...locations.get(currentLocation) });
      visitedLocations.add(currentLocation);
    }
  }

  return { ruta: path };
}
//Verbo POST PARA CREAR LA RUTA
ruta.post("/api/crearRuta", (req, res) => {
  const jsonData = req.body;
  const tspRoute = findShortestTSPRoute(jsonData);
  return res.send(JSON.stringify(tspRoute, null, 2));
});

module.exports = ruta;
