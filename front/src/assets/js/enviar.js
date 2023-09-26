const fecha = document.querySelector("#fecha");
const respuestaPreguntaUno = document.querySelector("#respuestaPreguntaUno");
const respuestaPreguntaDos = document.querySelector("#respuestaPreguntaDos");
const respuestaPreguntaTres = document.querySelector("#respuestaPreguntaTres");
const respuestaPreguntaCuatro = document.querySelector("#respuestaPreguntaCuatro");
const calificacion = document.querySelector("#calificacion");
const btnEnviar = document.querySelector("#btnEnviar");
const urlApi = "http://localhost:4000/api/v1/visitas/insertar";

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      fecha: fecha.value,
      respuestaPreguntaUno: respuestaPreguntaUno.value,
      respuestaPreguntaDos: respuestaPreguntaDos.value,
      respuestaPreguntaTres: respuestaPreguntaTres.value,
      respuestaPreguntaCuatro: respuestaPreguntaCuatro.value,
      calificacion: calificacion.value,
    }),
  })
    .then((response) => {
      return response.text();
    })

    .then((response) => {
      if (response === "true") {
        Swal.fire("Felicitaciones!", "Encuesta registrada satisfactoriamente", "success");
        setTimeout(() => {
          window.location.reload;
        }, 2500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error en la insercion",
        });
      }
    });
});
