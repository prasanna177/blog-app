import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";

const MyChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chartInstance.destroy();
    }
  }, [data]);

  return <Line data={data} ref={chartRef} />;
};

export default MyChartComponent;
