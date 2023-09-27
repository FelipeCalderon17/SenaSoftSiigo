//Puerta de entrada de la app(entrypoint), usamos el principio SRP(single-responsibility principle)
//Instanciamos los modulos requeridos
const express = require("express");
const app = express(); //creamos nuestra aplicacion lamando el metodo construtor de express
app.use("/", require("./modules/usuario")); //redirigimos al modulo rutas donde se resolveran las rutas
app.use("/", require("./modules/ruta")); //redirigimos al modulo rutas donde se resolveran las rutas

app.listen("5000", () => {
  console.log("Aplicacion ejecutandose en: http://localhost:5000");
});
