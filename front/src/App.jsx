import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Registro from "./components/Registro";

function App() {
  const [controlador, setControlador] = useState(0);

  return (
    <>
      {(() => {
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
            ></Login>
          );
        }
      })()}

      {/* <Login></Login> */}
      {}
    </>
  );
}

export default App;
