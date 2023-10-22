import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Chart as ChartJS,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function App() {
  const [data, setData] = useState([]);
  const [memory, setMemory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost/path");
      const text = await response.text();
      const json = JSON.parse(text);
      setData(json);
    }

    const intervalID = setInterval(fetchData, 5000);

    return () => clearInterval(intervalID);
  }, []);

  const chartData = () => {
    const totalMemoryData = data.filter(
      (item) => item.metric_name === "mem_total_gb"
    );
    const availableMemoryData = data.filter(
      (item) => item.metric_name === "mem_free_gb"
    );

    const newVar = totalMemoryData.map((item) => item.value);
    const newerVar = availableMemoryData.map((item) => item.value);

    return {
      labels: data.map((item) => item.timestamp),
      datasets: [
        {
          label: "Total Memory",
          data: newVar,
          borderColor: "red",
          fill: true,
        },
        {
          label: "Available Memory",
          data: 1,
          borderColor: "blue",
          fill: true,
        },
      ],
    };
  };

  return <Pie data={chartData()} />;
}

export default App;
