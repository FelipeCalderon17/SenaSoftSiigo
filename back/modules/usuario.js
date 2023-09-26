//las rutas para resolver cada verbo de http
//Crearemos los endpoints para cada verbo

//Paquetes requeridos
const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre sitio
const usuario = express.Router();
const cnn = require("./bdatos");
const nodemailer = require("nodemailer");
const md5 = require("md5");
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
    password: md5(req.body.password),
  };
  cnn.query("INSERT INTO usuario set ?", data, (error, respuesta) => {
    if (error) {
      console.log("Error!");
    } else {
      //Utilizo la librería nodemailer para hacer el envio del correo electronico
      var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "calderonfelipe017@gmail.com",
          pass: "etfwbubgtasjfbgy",
        },
      });

      var mailOptions = {
        from: "calderonfelipe017@gmail.com",
        to: req.body.email,
        subject: "Hello",
        text: "Hello world",
        html: "<b>Ya pude enviar correos </b>",
      };

      // send mail with defined transport object
      smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log("Message sent");
        }
      });
      res.status(201).send(respuesta);
    }
  });
});

usuario.post("/api/usuarioLogin", (req, res) => {
  let data = {
    email: req.body.email,
    password: req.body.password,
  };
  cnn.query("select email, password from usuario where email='" + data.email + "'", (error, respuesta) => {
    if (error) {
      console.log("Error!");
    } else {
      if (respuesta.email === req.body.email && respuesta.password === md5(req.body.password)) {
        res.status(201).send({
          resultado: "OK",
        });
      } else {
        res.status(201).send({
          resultado: "Error en los datos",
          email: req.body.email,
          pass: md5(req.body.password),
          pass2: respuesta,
        });
      }
    }
  });
});

module.exports = usuario;
