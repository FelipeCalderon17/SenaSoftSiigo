import React, { useState, useEffect } from "react";
import bg from "../assets/mp4/bg.mp4";
const urlApi = "http://localhost:5000/api/usuarios";

const Registro = ({ controlador, setControlador }) => {
  console.log(controlador);
  const registrarse = (e) => {
    e.preventDefault();
    console.log(e.target);
    let email = e.target.emailRegistro.value;
    let password = e.target.passRegistro.value;
    console.log(email);
    console.log(password);
    fetch(urlApi, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })

      .then((response) => {
        if (response.affectedRows === 1) {
          Swal.fire(
            "Felicitaciones!",
            "Usuario registrado satisfactoriamente",
            "success"
          );
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
  };
  return (
    <>
      <video
        className="bg-video"
        playsinline="playsinline"
        autoplay="autoplay"
        muted="muted"
        loop="loop"
      >
        <source src={bg} type="video/mp4" />
      </video>
      <div className="masthead">
        <div className="masthead-content text-white">
          <div className="container-fluid px-4 px-lg-0">
            <h1 className="fst-italic lh-1 mb-4 text-center">
              Registrar Usuario
            </h1>

            <form id="contactForm" onSubmit={registrarse}>
              <div className="row input-group-newsletter">
                <div className="col">
                  <input
                    className="form-control mt-2"
                    id="emailRegistro"
                    type="email"
                    placeholder="Ingrese el Correo electronico..."
                    aria-label="Ingrese el Correo electronico..."
                  />
                  <input
                    className="form-control mt-2"
                    id="passRegistro"
                    type="password"
                    placeholder="Ingrese su Contraseña..."
                    aria-label="Ingrese su Contraseña..."
                  />
                </div>
                <div className="row justify-content-center mt-3">
                  <div className="row">
                    <a
                      onClick={() => {
                        setControlador(0);
                        console.log(controlador);
                      }}
                      className="text-link btn text-white"
                    >
                      Ya tienes cuenta?
                    </a>
                  </div>
                  <input
                    className="btn btn-success w-50 mt-2"
                    type="submit"
                    id="btnRegistrarse"
                    value={"Registrarse"}
                  />
                </div>
              </div>
              <div
                className="invalid-feedback mt-2"
                data-sb-feedback="email:required"
              >
                An email is required.
              </div>
              <div
                className="invalid-feedback mt-2"
                data-sb-feedback="email:email"
              >
                Email is not valid.
              </div>

              <div className="d-none" id="submitSuccessMessage">
                <div className="text-center mb-3 mt-2">
                  <div className="fw-bolder">Form submission successful!</div>
                  To activate this form, sign up at
                  <br />
                  <a href="https://startbootstrap.com/solution/contact-forms">
                    https://startbootstrap.com/solution/contact-forms
                  </a>
                </div>
              </div>
              <div className="d-none" id="submitErrorMessage">
                <div className="text-center text-danger mb-3 mt-2">
                  Error sending message!
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="social-icons">
        <div className="d-flex flex-row flex-lg-column justify-content-center align-items-center h-100 mt-3 mt-lg-0">
          <a
            className="btn btn-dark m-3"
            href="https://github.com/StivenHerrera20"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            className="btn btn-dark m-3"
            href="https://github.com/FelipeCalderon17"
          >
            <i className="bi bi-github"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default Registro;
