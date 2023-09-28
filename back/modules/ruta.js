//Paquetes requeridos
const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre sitio
const ruta = express.Router();

//middlewares requeridos
//middlewares: traductor de datos entre aplicaciones distribuidas
ruta.use(express.json()); //serializa la data en json
ruta.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
ruta.options("*", cors()); //Configura las ip admitidas por cors, * == todas
const cnn = require("./bdatos");
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
ruta.post("/api/crearRuta", async (req, res) => {
  const jsonData = req.body;
  if (!jsonData || !jsonData.ubicaciones || !jsonData.conexiones || !jsonData.inicio) {
    return res.status(400).json({ resultado: false, error: "Datos JSON incompletos o incorrectos" });
  } else {
    const resultado = encontrarRutaMasEficiente(jsonData);
    let dataInsertar = {
      nodo_inicio: resultado.rutaMasEficiente[0].nombre,
      nodo_fin: resultado.rutaMasEficiente[resultado.rutaMasEficiente.length - 1].nombre,
      nodo_inicio_x: resultado.rutaMasEficiente[0].posX,
      nodo_inicio_y: resultado.rutaMasEficiente[0].posY,
      nodo_fin_x: resultado.rutaMasEficiente[resultado.rutaMasEficiente.length - 1].posX,
      nodo_fin_y: resultado.rutaMasEficiente[resultado.rutaMasEficiente.length - 1].posY,
    };
    cnn.query("insert into ruta set ?", dataInsertar, (error, respuesta) => {
      if (error) {
        console.log("error" + error.message);
      } else {
        cnn.query("select max(idRuta) as idRuta from ruta", (error, respuesta) => {
          if (error) {
            console.log("error" + error.message);
          }
          let idRuta = respuesta[0].idRuta;
          for (let i = 0; i < resultado.rutaMasEficiente.length; i++) {
            let dataInsert = {
              nodo_nombre: resultado.rutaMasEficiente[i].nombre,
              nodo_posicion_x: resultado.rutaMasEficiente[i].posX,
              nodo_posicion_y: resultado.rutaMasEficiente[i].posY,
              Ruta_idRuta: idRuta,
            };
            cnn.query("insert into ruta_completa set ?", dataInsert, (error, respuesta) => {
              if (error) {
                console.log("error" + error.message);
              }
            });
          }
        });
        return res.send({
          Ruta: resultado.rutaMasEficiente.map((nodo) => `${nodo.nombre} (X${nodo.posX}X), (Y${nodo.posY}Y)`).join(" -> "),
          Nodos_sin_conexion: resultado.nodosSinConexion.map((nodo) => `${nodo.nombre} (X${nodo.posX}X), (Y${nodo.posY})Y`).join(", "),
          resultado: true,
        });
      }
    });
  }
});

module.exports = ruta;
