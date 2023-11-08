import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";
import axios from "axios";

const FarmerBreakdownChart = ({ isDashboard = false }) => {
  // const { data, isLoading } = useGetSalesQuery();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  //fisheriesdashboard/getAllFishingDetailsWithFishermens
  const theme = useTheme();

  const [detail, setDetail] = useState(null);
  const [dataNew, setDataNew] = useState(null)
  // const [data,setData] = useState();

  const [loading, setLoading] = useState(true); // Added loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {


    axios.get(`${baseUrl}/districtAquaCulturist/getAllAquaFarmingDetails`).then(response => {

      setDetail(response.data);
      setDataNew(detail.data)

      // setData(detail.data)

      // setData(detail.data)
      // Set loading to false when the response is received
      setIsLoading(false);


    });

  }, [detail]);
  // console.log("Pie Chart Data",dataNew)

  if (!dataNew || isLoading) return "Loading...";

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.primary[300],
    theme.palette.secondary[500],
  ];

  const survivalObject = dataNew.map((item) => ({

    survival: item.survival,
    month: item.month,
  }));

  function sumNumOfSurvivalSpecies(arr) {
    let sum = 0;
    for(let i = 0; i < arr.length; i++) {
        sum += arr[i].survival;
    }
    return sum;
}
  
  const formattedData = survivalObject.map((item, i) => ({
    id: item.month,
    label: item.month,
    value: item.survival,
    color: colors[i],
  }));


  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "625px" : undefined}

      position="relative"
    >
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[800],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        // colors={{ datum: "data.color" }} //pie chart color
        margin={
          isDashboard
            ? { top: 40, right: 310, bottom: 100, left: 10 }
            : { top: 40, right: 310, bottom: 80, left: 10 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 4]],
        }}
        
      />
      <Box
        position="absolute"
        top="50%"
        left="28%"
        color={theme.palette.secondary[100]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          {!isDashboard && "Total:"} {sumNumOfSurvivalSpecies(survivalObject)}
        </Typography>
      </Box>
    </Box>
  );
};

export default FarmerBreakdownChart;
