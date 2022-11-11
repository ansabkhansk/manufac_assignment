import React from 'react';
import ReactEcharts from "echarts-for-react";
import './App.css';
import Alcohol from './Alcohol';

function App() {
  const averages = {};
  const colorIntensity = [];
  const hue = [];
  for (let i = 0; i < Alcohol.length; i++) {
    const fluid = Alcohol[i]; // Define a constant fluid and stores all objects (in key value pairs) from the Alcohol array 
    colorIntensity.push(fluid['Color intensity']);
    hue.push(fluid.Hue);
    const alcoholContent = fluid.Alcohol; // To store the values of key "Alcohol" from the fluid object
    if (!averages[alcoholContent]) {
      averages[alcoholContent] = { length: 0, sum: 0, average: 0 }; // If the condition is true then it will assign the objects with properties inside the specific position of averages object.
    }
    const alcohol = averages[alcoholContent];
    console.log(alcohol)
    alcohol.length++;
    alcohol.sum += fluid['Malic Acid'];
    alcohol.average = alcohol.sum / alcohol.length;
  }

  const alcoholCategory = [];
  const malicAcid = [];
  for (const a in averages) {
    alcoholCategory.push(a) // Push indices as a category in alcohol category array
    malicAcid.push(averages[a].average) // Push average value from averages object in Malic acid array.
  }

  const barChart = {
    xAxis: {
      //To enter Label of X-Axis with styles
      name: "Alcohol Category",
      nameLocation: "middle",
      nameTextStyle: {
        fontWeight: "bolder",
        fontSize: 16,
        padding: [10, 5]
      },
      data: alcoholCategory,

    },
    yAxis: {
      //To enter Label of Y-Axis with styles
      name: "Average Malic Acid",
      nameLocation: "middle",
      nameTextStyle: {
        fontWeight: "bolder",
        fontSize: 16,
        padding: [10, 5]
      },
    },
    series: [
      {
        type: 'bar',
        data: malicAcid,
      },
    ]
  }

  const scatterPlot = {
    xAxis: {
      type: "category",
      name: "Color Intensity",
      nameLocation: "middle",
      nameTextStyle: {
        fontWeight: "bolder",
        fontSize: 16,
        padding: [10, 5]
      },
      data: colorIntensity,
    },
    yAxis: {
      type: "value",
      name: "Hue",
      nameLocation: "middle",
      nameTextStyle: {
        fontWeight: "bolder",
        fontSize: 16,
        padding: [10, 5]
      },
    },
    //To apply slider in Scatter Plot graph, as it is having too muchbarChart
    dataZoom: [{
      top: "91%",
      height: 20,
      moveHandleSize: 3
    }],
    series: [
      {
        type: 'scatter',
        symbolSize: 10,
        data: hue,
      },
    ],
  }

  return (
    <>
      <ReactEcharts
        option={barChart}
        style={{ width: "600px", height: "300px" }}
      />
      <ReactEcharts
        option={scatterPlot}
        style={{ width: "600px", height: "300px" }}
      />
    </>
  );
}

export default App;
