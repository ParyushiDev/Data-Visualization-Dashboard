import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart2 from "../../components/PieChart2";

const Pie2 = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart2 />
      </Box>
    </Box>
  );
};

export default Pie2;
