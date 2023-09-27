import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Registro from "./components/Registro";
import IndexBase from "./components/IndexBase";

function App() {
  const [controlador, setControlador] = useState(0);
  const [loginControlador, setLoginControlador] = useState(0);

  return (
    <>
      {(() => {
        if (loginControlador == 1) {
          return <IndexBase></IndexBase>;
        } else {
          if (controlador == 1) {
            return (
              <Registro
                controlador={controlador}
                setControlador={setControlador}
              ></Registro>
            );
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

      {/* <Login></Login> */}
      {}
    </>
  );
}

export default App;
