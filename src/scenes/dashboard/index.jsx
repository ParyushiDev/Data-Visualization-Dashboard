import { Box, Typography, useTheme } from "@mui/material";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/pieChart";
import PieChart2 from "../../components/PieChart2";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //dropdown
  const [endYear, setEndYear] = React.useState(0);
  const [StartYear, setStartYear] = React.useState(0);
  const [SourceCount, setSourceCount] = React.useState(0);
  //Source Count

  const [openYear, setOpenYear] = React.useState(false);
  const [openStartYear, setOpenStartYear] = React.useState(false);
  const [openSourceCount, setOpenSourceCount] = React.useState(false);

  //year
  const handleEndYearChange = (event) => {
    // console.log("Event target value", event.target.value);
    setEndYear(event.target.value);
  };
  //StartYear
  const handleStartYearChange = (event) => {
    // console.log("Event target value", event.target.value);
    setStartYear(event.target.value);
  };
  //Source Count
  const handleSourceCountChange = (event) => {
    console.log("Event target value", event.target.value);
    setSourceCount(event.target.value);
  };

  //year
  const handleCloseYear = () => {
    setOpenYear(false);
  };
  const handleOpenYear = () => {
    setOpenYear(true);
  };

  //StartYear
  const handleCloseStartYear = () => {
    setOpenStartYear(false);
  };
  const handleOpenStartYear = () => {
    setOpenStartYear(true);
  };

  //Source Count
  const handleCloseSourceCount = () => {
    setOpenSourceCount(false);
  };
  const handleOpenSourceCount = () => {
    setOpenSourceCount(true);
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="190px"
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Pestle Chart
              </Typography>
            </Box>

            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                }}
              >
                <InputLabel id="demo-controlled-open-select-label">
                  End Year
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openYear}
                  onClose={handleCloseYear}
                  onOpen={handleOpenYear}
                  value={endYear}
                  label="endYear"
                  onChange={handleEndYearChange}
                >
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Topic Chart
          </Typography>{" "}
          <Box height="200px">
            {" "}
            {/* //dropdown */}
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                }}
              >
                <InputLabel id="demo-controlled-open-select-label">
                  End Year
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openYear}
                  onClose={handleCloseYear}
                  onOpen={handleOpenYear}
                  value={endYear}
                  label="endYear"
                  onChange={handleEndYearChange}
                >
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* //pieChart */}
            <PieChart isDashboard={true} filter={endYear} />
          </Box>
        </Box>
        {/* Pie2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Source Chart
          </Typography>{" "}
          <Box height="200px">
            {" "}
            {/* //dropdown */}
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                }}
              >
                <InputLabel id="demo-controlled-open-select-label">
                  Source Count
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openSourceCount}
                  onOpen={handleOpenSourceCount}
                  onClose={handleCloseSourceCount}
                  value={SourceCount}
                  label="SourceCount"
                  onChange={handleSourceCountChange}
                >
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  <MenuItem value={10}>greater than 10</MenuItem>
                  <MenuItem value={20}>greater than 20</MenuItem>
                  <MenuItem value={30}>greater than 30</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* //pieChart */}
            <PieChart2 isDashboard={true} filter={SourceCount} />
          </Box>
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Region Chart
          </Typography>
          <Box height="300px" mt="-20px">
            {/* //dropdown */}
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                }}
              >
                <InputLabel id="demo-controlled-open-select-label">
                  Start Year
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openStartYear}
                  onClose={handleCloseStartYear}
                  onOpen={handleOpenStartYear}
                  value={StartYear}
                  label="StartYear"
                  onChange={handleStartYearChange}
                >
                  {/* <MenuItem value="Filter">
                    <em>None</em>
                  </MenuItem> */}
                  <MenuItem value={2028}>2028</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2016}>2016</MenuItem>
                  {/* <MenuItem value={"Healthcare"}>healthcare</MenuItem>
                  <MenuItem value={"Economic"}>economic</MenuItem>
                  <MenuItem value={"Industrial"}>Industrial</MenuItem>
                  <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
                  <MenuItem value={"Political"}>Political</MenuItem> */}
                </Select>
              </FormControl>
            </Box>
            {/* //barchart */}
            <BarChart isDashboard={false} filter={StartYear} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
