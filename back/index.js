//Puerta de entrada de la app(entrypoint), usamos el principio SRP(single-responsibility principle)
//Instanciamos los modulos requeridos
const express = require("express");
const app = express(); //creamos nuestra aplicacion lamando el metodo construtor de express
//redirigimos a los modulos donde se definiran las rutas
app.use("/", require("./modules/usuario"));
app.use("/", require("./modules/ruta"));
app.use("/", require("./modules/archivos"));

app.listen("5000", () => {
  console.log("Aplicacion ejecutandose en: http://localhost:5000");
});
