import React from "react";
import { Bar as BarChart } from "react-chartjs-2";

const BOOKINGS_BUCKETS = {
  Cheap: { min: 0, max: 100 },
  Normal: { min: 100, max: 200 },
  Expensive: { min: 200, max: 100000 }
};

const bookingsChart = props => {
  let values = [];
  const chartData = { labels: [], datasets: [] };

  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((prev, current) => {
      if (
        current.event.price > BOOKINGS_BUCKETS[bucket].min &&
        current.event.price < BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    // output[bucket] = filteredBookingsCount;

    values.push(filteredBookingsCount);
    chartData.labels.push(bucket);
    chartData.datasets.push({
      // label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: values
    });
    values = [...values];
    values[values.length - 1] = 0;
  }
  console.log("output", chartData);

  return (
    <div style={{ textAlign: "center" }}>
      <BarChart
        data={chartData}
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  );
};

export default bookingsChart;
