import React from 'react';
import ReactEcharts from "echarts-for-react";
import './App.css';
import Alcohol from './Alcohol';

function App() {
  const alcohol = Alcohol.map(alcoholData => {
    return alcoholData['Alcohol']
  })
  const alcoholCategory = [...new Set(alcohol)] //To create alcohol category array

  const malicAcid = []
  for (var i = 0; i < alcoholCategory.length; i++) {
    var sum = 0;
    var count = 0;
    for (var j = 0; j < alcohol.length; j++) {
      if (alcohol[j] === alcoholCategory[i]) {
        count++;
        sum += Alcohol[j]['Malic Acid']
      }
    }
    malicAcid[i] = sum / count;  //To find average of Malic Acid according to alcohol category and insert them in an array
  }

  const colorIntensity = Alcohol.map(alcoholData => {
    return alcoholData['Color intensity']  //return Array of Color Intensity
  })
  const hue = Alcohol.map(alcoholData => {
    return alcoholData['Hue']  //return Array of Hue
  })

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
      ></ReactEcharts>
      <ReactEcharts
        option={scatterPlot}
        style={{ width: "600px", height: "300px" }}
      ></ReactEcharts>
    </>
  );
}

export default App;
