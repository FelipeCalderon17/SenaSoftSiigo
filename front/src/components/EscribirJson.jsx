import React, { useState, useEffect } from "react";

const EscribirJson = () => {
  return (
    <>
      <form action="" className="d-flex">
        <div className="col-md-10">
          <div className="row g-2">
            <div className="col-md-2 align-self-center">
              <h5>Escribir JSON:</h5>
            </div>
            <div className="col-md-9">
              <textarea
                style={{ resize: "none" }}
                rows="5"
                className="form-control border-0 w-100"
                placeholder="Escribir JSON"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="col-md-2 align-self-center">
          <button className="btn btn-dark border-0 w-100">Enviar</button>
        </div>
      </form>
    </>
  );
};

export default EscribirJson;
