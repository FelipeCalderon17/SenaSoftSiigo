import React, { useState, useEffect } from "react";

const SubirJson = () => {
  return (
    <>
      <form action="" className="d-flex">
        <div className="col-md-10">
          <div className="row g-2">
            <div className="col-md-2 ">
              <h5>Subir JSON:</h5>
            </div>
            <div className="col-md-9">
              <input
                type="file"
                className="form-control border-0 w-100"
                placeholder="Archivo JSON"
              />
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <button className="btn btn-dark border-0 w-100">Enviar</button>
        </div>
      </form>
    </>
  );
};

export default SubirJson;
