const btnRegistrarse = document.querySelector("#btnRegistrarse");
const urlApi = "http://localhost:4000/api/v1/usuario/insertar";
const nombreRegistro = document.querySelector("#nombreRegistro");
const apellidoRegistro = document.querySelector("#apellidoRegistro");
const ciudadRegistro = document.querySelector("#ciudadRegistro");
const direccionRegistro = document.querySelector("#direccionRegistro");
const telefonoRegistro = document.querySelector("#telefonoRegistro");
const emailRegistro = document.querySelector("#emailRegistro");

btnRegistrarse.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombreRegistro.value,
      apellido: apellidoRegistro.value,
      ciudad: ciudadRegistro.value,
      direccion: direccionRegistro.value,
      telefono: telefonoRegistro.value,
      email: emailRegistro.value,
    }),
  })
    .then((response) => {
      return response.text();
    })

    .then((response) => {
      if (response === "true") {
        Swal.fire("Felicitaciones!", "Usuario registrado satisfactoriamente", "success");
        setTimeout(() => {
          window.location = "index.html";
        }, 1700);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error en la insercion",
        });
      }
    });
});
