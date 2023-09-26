const btnRegistrarse = document.querySelector("#btnRegistrarse");
const urlApi = "http://localhost:5000/api/usuarios";
const passRegistro = document.querySelector("#passRegistro");
const emailRegistro = document.querySelector("#emailRegistro");

btnRegistrarse.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: emailRegistro.value,
      password: passRegistro.value,
    }),
  })
    .then((response) => {
      return response.text();
    })

    .then((response) => {
      if (response.affectedRows === 1) {
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
