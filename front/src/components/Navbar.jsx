import React, { useState, useEffect } from "react";

const Navbar = ({ navbarControlador, setNavbarControlador }) => {
  const [cerrarSesion, setcerrarSesion] = useState(0);

  const alerta = () => {
    Swal.fire({
      title: "Desea cerrar sesión?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Cerrar Sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {}, []);
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-white navbar-light  sticky-top p-0">
        <a
          href="index.html"
          class="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5"
        >
          <h4 class="m-0 text-primary">RUTASOFT</h4>
        </a>
        <button
          type="button"
          class="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav ms-auto p-4 p-lg-0">
            <a
              href="#"
              class="nav-item nav-link active"
              onClick={(e) => {
                //Evitamos el autoReload de los forms
                e.preventDefault();
                //Modificamos la variable navbarControlador
                setNavbarControlador(0);
              }}
            >
              inicio
            </a>
            <a
              href=""
              class="nav-item nav-link"
              onClick={(e) => {
                //Evitamos el autoReload de los forms
                e.preventDefault();
                //Decision para activar y desactivar el form
                navbarControlador == 1
                  ? setNavbarControlador(0)
                  : setNavbarControlador(1);
              }}
            >
              Subir Json
            </a>
            <a
              href=""
              class="nav-item nav-link"
              onClick={(e) => {
                //Evitamos el autoReload de los forms
                e.preventDefault();
                //Decision para activar y desactivar el form
                navbarControlador == 2
                  ? setNavbarControlador(0)
                  : setNavbarControlador(2);
              }}
            >
              Escribir Json
            </a>
          </div>
          <button
            href=""
            class="btn btn-primary rounded-0 py-3 px-lg-5 d-none d-lg-block "
            onClick={() => {
              alerta();
            }}
          >
            <i class="fa fa-user ms-3"></i>
            <p>Nombre usuario</p>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
