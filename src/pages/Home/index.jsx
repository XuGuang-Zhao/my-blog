import BarChart from "@/components/BarChart.jsx";

const Home = () => {
  return (
    <BarChart
      title={"Weekly Programming"}
      xAxis={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
      series={[100, 200, 150, 80, 70, 110, 130]}
    />
  );
};

export default Home;
