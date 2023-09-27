import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const datos = {
  labels: ["Punto A", "Punto B", "Punto C", "Punto D"],
  datasets: [
    {
      label: "First dataset",
      /*  data: [33, 53, 85, 41, 44, 65], */
      data: [
        { x: 4, y: 62 },
        { x: 8, y: 6 },
        { x: 13, y: 46 },
        { x: 17, y: 2 },
      ],

      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    /*   {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774",
      }, */
  ],
};

const Mapa = () => {
  return <Scatter data={datos}></Scatter>;
};

export default Mapa;
