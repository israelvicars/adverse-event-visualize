"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Event {
  receivedate: string;
  [key: string]: any;
}

interface TrendChartProps {
  events: Event[];
}

export function TrendChart({ events }: TrendChartProps) {
  // Process events data to group by year
  const yearData = events?.reduce<Record<string, number>>((acc, event) => {
    const year = event.receivedate.slice(0, 4);
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const labels = yearData ? Object.keys(yearData).sort() : [];
  const dataPoints = labels.map((year) => yearData[year]);

  const data = {
    labels,
    datasets: [
      {
        label: "Adverse Events",
        data: dataPoints,
        backgroundColor: "rgba(99, 102, 241, 0.5)", // Indigo color
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Events",
        },
      },
    },
  };

  if (!events?.length) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No data to display
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <Bar data={data} options={options} />
    </div>
  );
} 