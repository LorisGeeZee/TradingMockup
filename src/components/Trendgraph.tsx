import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Stock } from "../types/Stocks";
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  stocks: Stock[];
}

const TrendGraph: React.FC<Props> = ({ stocks }) => {
  const [totalValues, setTotalValues] = useState<string[]>([]);

  useEffect(() => {
    const totalValue = stocks.reduce(
      (total, stock) => total + (stock.value * stock.amount || 0),
      0
    );

    const formattedTotalValue = (Math.round(totalValue * 100) / 100).toFixed(2);
    if (totalValues.length === 0) {
      setTotalValues([formattedTotalValue]);
    } else {
      setTotalValues((prevTotalValues) => {
        const newTotalValues = [...prevTotalValues, formattedTotalValue];

        if (newTotalValues.length > 52) {
          newTotalValues.shift();
        }
        return newTotalValues;
      });
    }
  }, [stocks]);

  const labels = totalValues.map((_, index) => `Week ${index + 1}`);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Performance",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: totalValues,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default TrendGraph;
