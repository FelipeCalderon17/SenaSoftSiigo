import React, { useState, useEffect } from "react";

const SubirJson = () => {
  const enviarJson = (e) => {
    e.preventDefault();
    function Upload({ children }) {
      const [files, setFiles] = useState("");
      const handleChange = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
          console.log("e.target.result", e.target.result);
          setFiles(e.target.result);
        };
      };
    }
    if (!file) {
      alert("Por favor, seleccione un archivo JSON.");
      return;
    }

    const formData = new FormData();
    formData.append("archivoJSON", file);
    try {
      const response = fetch("http://localhost:5000/api/uploadJson", {
        method: "POST",
        body: formData,
      });
      if (response.mensaje == "Archivo JSON subido y procesado correctamente.") {
        const data = response.json();
        console.log(data);
      } else {
        alert("Error al subir el archivo JSON.");
      }
    } catch (error) {
      console.error("Error en la solicitud fetch:", error);
    }
  };
  return (
    <>
      <form action="" onSubmit={enviarJson} className="d-flex">
        <div className="col-md-10">
          <div className="row g-2">
            <div className="col-md-2 ">
              <h5>Subir JSON:</h5>
            </div>
            <div className="col-md-9">
              <input type="file" id="json" className="form-control border-0 w-100" placeholder="Archivo JSON" accept=".json,.JSON" />
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <input type="submit" className="btn btn-dark border-0 w-100" value="Enviar" />
        </div>
      </form>
    </>
  );
};

export default SubirJson;
