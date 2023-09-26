//las rutas para resolver cada verbo de http
//Crearemos los endpoints para cada verbo

//Paquetes requeridos
const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre sitio
const usuario = express.Router();
const cnn = require("./bdatos");
const encrypt_data = require("./funciones");
const nodemailer = require("nodemailer");
//middlewares requeridos
//middlewares: traductor de datos entre aplicaciones distribuidas
usuario.use(express.json()); //serializa la data en json
usuario.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
usuario.options("*", cors()); //Configura las ip admitidas por cors, * == todas

//codificamos los verbos HTTP

//Verbo GET LISTAR
usuario.get("/api/usuarios", (req, res) => {
  cnn.query("SELECT * FROM usuario", (error, response) => {
    if (error) {
      throw error;
    } else {
      res.send(response);
    }
  });
});
//Verbo POST, insertar un nuevo usuario
usuario.post("/api/usuarios", (req, res) => {
  let data = {
    email: req.body.email,
    password: encrypt_data(req.body.password),
  };
  cnn.query("INSERT INTO usuario set ?", data, (error, respuesta) => {
    if (error) {
      console.log("Error!");
    } else {
      /* let jConfig = {
        host: "localhost",
        port: "456",
        secure: false,
        auth: {
          type: "login",
          user: req.body.email,
          pass: req.body.password,
        },
      };
      let email = {
        from: "senasoft2023@gmail.com", //remitente
        to: req.body.email, //destinatario
        subject: "Nuevo mensaje de usuario", //asunto del correo
        html: ` 
            <div> 
            <p>Hola amigo</p> 
            <p>Esto es una prueba del vídeo</p> 
            <p>¿Cómo enviar correos eletrónicos con Nodemailer en NodeJS </p> 
            </div> 
        `,
      };
      let createTransport = nodemailer.createTransport(jConfig);
      createTransport.sendMail(email, function (error, info) {
        if (error) {
          console.log("Error al enviar email" + error.message);
        } else {
          console.log("Correo enviado correctamente");
        }
        createTransport.close();
      }); */
      res.status(201).send(respuesta);
    }
  });
});

module.exports = usuario;
