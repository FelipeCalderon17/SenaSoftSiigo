//las rutas para resolver cada verbo de http
//Crearemos los endpoints para cada verbo

//Paquetes requeridos
const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre sitio
const usuario = express.Router();
const cnn = require("./bdatos");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const { getToken, getTokenData } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
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
      console.log(error.message);
    } else {
      res.send(response);
    }
  });
});
//Verbo POST, insertar un nuevo usuario
usuario.post("/api/usuarios", (req, res) => {
  const code = uuidv4();
  const data = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 7),
    codigo: code,
    verificado: false,
    sesion_activa: false,
  };
  cnn.query("INSERT INTO usuario set ?", data, (error, respuesta) => {
    if (error) {
      console.log("Error!1");
    } else {
      //Utilizo la librería nodemailer para hacer el envio del correo electronico
      var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "rutasoft2023@gmail.com",
          pass: "uddsoxkoztpnfmxe",
        },
      });

      var mailOptions = {
        from: "rutasoft2023@gmail.com",
        to: req.body.email,
        subject: "Bienvenido al sistema RutaSoft",
        html: `<div>"
  <h2>Hola ${data.email} Bienvendido al software de RutaSoft</h2>
  <p>Para confirmar tu cuenta haz click en el siguiente enlace</p>
  <a href="http://localhost:5000/api/usuarios/confirm/${getToken(data)}">Confirmar Cuenta</a>
  </div>`,
      };

      // send mail with defined transport object
      smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log("Message sent");
        }
      });
      res.status(200).send({
        status: "OK",
      });
    }
  });
});
//Ruta para hacer el login
usuario.post("/api/usuarioLogin", (req, res) => {
  let data = {
    email: req.body.email,
    password: req.body.password,
  };
  cnn.query("select email, password from usuario where email='" + data.email + "'", (error, respuesta) => {
    if (error) {
      console.log("Error!2");
    } else {
      if (bcrypt.hashSync(data.password) == respuesta[0].password && req.body.email == respuesta[0].email) {
        cnn.query("update usuario set sesion_activa=1"),
          (error, respuesta) => {
            if (error) {
              console.log("Error!" + error.message);
            }
          };
        res.send({
          c: bcrypt.hashSync(data.password),
          resultado: "OK",
        });
      } else {
        res.status(201).send({
          resultado: "Error en los datos",
        });
      }
    }
  });
});

//Verbo GET LISTAR PARA LA VALIDACION DE LA API
usuario.get("/api/usuarios/confirm/:token", (req, res) => {
  try {
    //obtenemos el token
    const { token } = req.params;
    //verificamos la data del token
    const dataToken = getTokenData(token);
    if (dataToken === null) {
      return res.json({
        succes: false,
        msg: "Error al obtener data",
        data: dataToken.data,
      });
    }
    //buscar si existe el usuario
    console.log(dataToken);
    let { email, codigo } = dataToken.data;
    cnn.query("select * from usuario where email='" + email + "'", (error, response) => {
      if (error) {
        console.log(error.message);
      } else {
        let codedb = response.codigo;
        if (response.length < 1) {
          return res.json({
            succes: false,
            msg: "Error al obtener data",
          });
        }
      }
    });
    //actualizar usuario
    cnn.query("update usuario set verificado=true where email='" + email + "'", (error, response) => {
      if (error) {
        console.log(error.message);
      } else {
        return res.json({
          respuesta: response,
          validado: true,
        });
      }
    });

    //redireccionar a la confirmacion

    /* return response.redirect('/SenaSoftSiigo/back/confirm.html')  */
    return res.send("Validado correctamente");
  } catch (error) {
    console.log("Error!4" + error.message);
  }
});
//Hago la ruta para buscar si el email ya esta registrado en el sistema
usuario.post("/api/buscarCorreo", (req, res) => {
  let data = {
    email: req.body.email,
  };
  cnn.query("select email from usuario where email='" + data.email + "'", (error, respuesta) => {
    if (error) {
      console.log("Error!2");
    } else {
      res.status(201).send({ res: respuesta });
    }
  });
});
//Hago la ruta para verificar si la sesion esta iniciada
usuario.post("/api/sesion", (req, res) => {
  let data = {
    email: req.body.email,
  };
  cnn.query("select sesion_activa from usuario where email='" + data.email + "'", (error, respuesta) => {
    if (error) {
      console.log("Error!2");
    } else {
      if (respuesta[0].sesion_activa == 1) {
        return res.send("True");
      } else {
        return res.send("False");
      }
    }
  });
});
//Hago el metodo para dejar la funcion inactiva
usuario.post("/api/cerrarSesion", (req, res) => {
  let data = {
    email: req.body.email,
  };
  cnn.query("update usuario set sesion_activa = 0 where email='" + data.email + "'", (error, respuesta) => {
    if (error) {
      console.log("Error!2");
    } else {
      res.send({
        sesion_activa: false,
      });
    }
  });
});
//
usuario.post("/api/validarVerificacion", (req, res) => {
  let data = {
    email: req.body.email,
  };
  cnn.query("select verificado from usuario where email='" + data.email + "'", (error, respuesta) => {
    if (error) {
      console.log("Error!2");
    } else {
      if (respuesta[0].verificado == 1) {
        res.send({
          verificado: true,
        });
      } else {
        res.send({
          verificado: false,
        });
      }
    }
  });
});
module.exports = usuario;
