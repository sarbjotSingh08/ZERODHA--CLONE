import { Doughnut as ChartDoughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export  function Doughnut({ data }) {
  return <ChartDoughnut data={data} />;
}

// import { Doughnut as ChartDoughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);
    
// export  function Doughnut({ data }) {
//   return <ChartDoughnut data={data} />;
// }