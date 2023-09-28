const express = require("express");
const cors = require("cors"); // Para evitar restricciones entre sitios
const multer = require("multer");
const path = require("path");

const app = express.Router();
// Middlewares requeridos
app.use(express.json()); // Serializa la data en JSON
app.use(cors()); // Permite acceso de otras direcciones IP distintas a mi servicio
app.options("*", cors()); // Configura las IP admitidas por cors, * == todas
const fs = require("fs");
//funcion para organizar los datos de multer
// Función para organizar los datos de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage });

// Ruta para manejar la carga de archivos JSON
app.post("/api/uploadJson", uploads.single("file0"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        mensaje: "No se ha seleccionado ningún archivo JSON.",
      });
    }

    // Leer el contenido del archivo subido
    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Analizar el contenido como un objeto JSON
    const jsonData = JSON.parse(fileContent);

    // Responder con un mensaje de éxito
    res.status(200).json({
      mensaje: "Archivo JSON subido y procesado correctamente.",
      datos: jsonData,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error interno del servidor",
      error: error.message,
    });
  }
});

module.exports = app;
