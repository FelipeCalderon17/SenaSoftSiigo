/*!
 * Start Bootstrap - Coming Soon v6.0.7 (https://startbootstrap.com/theme/coming-soon)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-coming-soon/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
  },
  buttonsStyling: false,
});

swalWithBootstrapButtons
  .fire({
    title: "Bienvenido al sistema",
    text: "Ayudanos a llenar la siguiente encuesta!",
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "Siguiente!",
    reverseButtons: true,
  })
  .then((result) => {
    if (result.isConfirmed) {
    }
  });
