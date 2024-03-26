import * as echarts from "echarts";
import { useEffect, useRef } from "react";
const BarChart = ({ title, xAxis, series }) => {
  const chart = useRef();
  useEffect(() => {
    const chartDom = chart.current;
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "bar",
          data: series,
        },
      ],
    };
    option && myChart.setOption(option);
  }, []);
  return <div ref={chart} style={{ width: "500px", height: "400px" }}></div>;
};

export default BarChart;
