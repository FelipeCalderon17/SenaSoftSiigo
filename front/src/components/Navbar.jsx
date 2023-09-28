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
        fetch("http://localhost:5000/api/cerrarSesion", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: "calderonfelipe017@gmail.com",
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.sesion_activa == false) {
              window.location.reload();
            } else {
              console.log("algo esta pasando che");
            }
          });
      }
    });
  };

  useEffect(() => {}, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light  sticky-top p-0">
        <a href="index.html" className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
          <h4 className="m-0 text-primary">RutaSoft</h4>
        </a>
        <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <a
              href="#"
              className="nav-item nav-link active"
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
              className="nav-item nav-link"
              onClick={(e) => {
                //Evitamos el autoReload de los forms
                e.preventDefault();
                //Decision para activar y desactivar el form
                navbarControlador == 1 ? setNavbarControlador(0) : setNavbarControlador(1);
              }}
            >
              Subir Json
            </a>
            <a
              href=""
              className="nav-item nav-link"
              onClick={(e) => {
                //Evitamos el autoReload de los forms
                e.preventDefault();
                //Decision para activar y desactivar el form
                navbarControlador == 2 ? setNavbarControlador(0) : setNavbarControlador(2);
              }}
            >
              Escribir Json
            </a>
          </div>
          <button
            href=""
            className="btn btn-primary rounded-0 py-3 px-lg-5 d-none d-lg-block "
            onClick={() => {
              alerta();
            }}
          >
            <i className="fa fa-user ms-3"></i>
            <p>Nombre usuario</p>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
