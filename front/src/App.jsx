import React, { useState, useEffect } from "react";
//Importamos los componentes que utilizaremos
import Login from "./components/Login";
import Registro from "./components/Registro";
import IndexBase from "./components/IndexBase";

function App() {
  //Controlador para el uso de login y registro
  const [controlador, setControlador] = useState(0);
  //Controlador para mostrar el index cuando inicie sesión
  const [loginControlador, setLoginControlador] = useState(0);

  return (
    <>
      {(() => {
        if (loginControlador == 1) {
          return <IndexBase></IndexBase>;
        } else {
          if (controlador == 1) {
            return <Registro controlador={controlador} setControlador={setControlador}></Registro>;
          } else {
            return (
              <Login
                controlador={controlador}
                setControlador={setControlador}
                loginControlador={loginControlador}
                setLoginControlador={setLoginControlador}
              ></Login>
            );
          }
        }
      })()}
    </>
  );
}

export default App;
