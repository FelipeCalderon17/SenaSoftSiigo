import React, { useState, useEffect } from "react";
import "../assets/css/styles.css";
import "../assets/css/index.css";
import bg from "../assets/mp4/bg.mp4";

const Login = ({
  controlador,
  setControlador,
  LoginControlador,
  setLoginControlador,
}) => {
  useEffect(() => {
    console.log(controlador);
  }, []);
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
              Inicio de sesión
            </h1>

            <form id="contactForm">
              <div className="row input-group-newsletter">
                <div className="col">
                  <input
                    className="form-control mt-2"
                    id="emailLogin"
                    type="email"
                    placeholder="Ingrese el Correo electronico..."
                    aria-label="Ingrese el Correo electronico..."
                  />
                  <input
                    className="form-control mt-2"
                    id="passLogin"
                    type="password"
                    placeholder="Ingrese su Contraseña..."
                    aria-label="Ingrese su Contraseña..."
                  />
                </div>
                <div className="row justify-content-center mt-3 text-center">
                  <div className="row">
                    <a
                      onClick={() => {
                        setControlador(1);
                        console.log(controlador);
                      }}
                      className="btn text-white"
                    >
                      No tienes cuenta?
                    </a>
                  </div>
                  <button
                    className="btn btn-success w-50 mt-2"
                    type="submit"
                    id="btnLogin"
                    onClick={() => {
                      setLoginControlador(1);
                    }}
                  >
                    Iniciar sesion
                  </button>
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

export default Login;
