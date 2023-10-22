// src/components/PieChart.js
import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
// In your PieChart.js or wherever you create the chart
import { Doughnut } from "react-chartjs-2";

class PieChart extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    // Fetch data from the PHP file or your API
    fetch("http://localhost/getMemoryJson.php")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data });
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }

  render() {
    const { data } = this.state;
    const chartData = {
      labels: data.map((item) => item.metric_name),
      datasets: [
        {
          data: data.map((item) => parseFloat(item.value)),
          backgroundColor: ["red", "green", "blue", "purple", "orange", "pink"], // Add more colors if needed
        },
      ],
    };

    return (
      <div>
        <h2>Pie Chart</h2>
        <Pie data={chartData} />
      </div>
    );
  }
}

export default PieChart;
