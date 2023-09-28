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
//middlewares requeridos
//middlewares: traductor de datos entre aplicaciones distribuidas
usuario.use(express.json()); //serializa la data en json
usuario.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
usuario.options("*", cors()); //Configura las ip admitidas por cors, * == todas

//Hago las funciones para encriptar y desencriptar
// Función para cifrar un texto

function cifrar(texto, desplazamiento) {
  let resultado = "";
  for (let i = 0; i < texto.length; i++) {
    const char = texto.charAt(i);
    const charCode = char.charCodeAt(0);

    // Verificar si el carácter es una letra, un número o un carácter especial
    if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z") || (char >= "0" && char <= "9")) {
      const nuevoCharCode = charCode + desplazamiento;
      resultado += String.fromCharCode(nuevoCharCode);
    } else {
      resultado += char; // Mantener los caracteres especiales sin cambios
    }
  }
  return resultado;
}

// Función para descifrar un texto cifrado con el mismo cifrado de sustitución por desplazamiento
function descifrar(textoCifrado, desplazamiento) {
  let resultado = "";
  for (let i = 0; i < textoCifrado.length; i++) {
    const char = textoCifrado.charAt(i);
    const charCode = char.charCodeAt(0);

    // Verificar si el carácter es una letra, un número o un carácter especial
    if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z") || (char >= "0" && char <= "9")) {
      const nuevoCharCode = charCode - desplazamiento;
      resultado += String.fromCharCode(nuevoCharCode);
    } else {
      resultado += char; // Mantener los caracteres especiales sin cambios
    }
  }
  return resultado;
}

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
    password: cifrar(req.body.password, 2),
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
      if (data.password == descifrar(respuesta[0].password, 2) && req.body.email == respuesta[0].email) {
        cnn.query("update usuario set sesion_activa=1"),
          (error, respuesta) => {
            if (error) {
              console.log("Error!" + error.message);
            }
          };
        res.send({
          resultado: "OK",
        });
      } else {
        res.status(201).send({
          resultado: "Error en los datos",
          passBody: data.password,
          passBD: descifrar(respuesta[0].password, 2),
          emailBody: req.body.email,
          emailBD: respuesta[0].email,
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
      }
    });

    //redireccionar a la confirmacion
    return res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Validacion RutaSoft</title>
      </head>
      <style>
        * {
          height: 100%;
        }
      </style>
      <body style="background-color: grey">
        <div style="display: grid; align-items: center; text-align: center">
          <h2 style="display: grid; align-items: end; text-align: center">
            Bienvenido a RutaSoft
          </h2>
          <h1>Muchas gracias por validar tu cuenta</h1>
        </div>
      </body>
    </html>
    `);
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
      1;
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
        return res.send(true);
      } else {
        return res.send(false);
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
      console.log("Error!" + error.message);
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
