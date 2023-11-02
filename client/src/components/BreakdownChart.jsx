import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";
import axios from "axios";

const BreakdownChart = ({ isDashboard = false }) => {
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


    axios.get(`${baseUrl}/fisheriesdashboard/getAllFishingDetails`).then(response => {

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

  const speciesObject = dataNew.map((item) => ({

    numOfSpecies: item.numOfSpecies,
    speciesType: item.speciesType,
  }));

  function sumNumOfSpecies(arr) {
    let sum = 0;
    for(let i = 0; i < arr.length; i++) {
        sum += arr[i].numOfSpecies;
    }
    return sum;
}
  
  const formattedData = speciesObject.map((item, i) => ({
    id: item.speciesType,
    label: item.speciesType,
    value: item.numOfSpecies,
    color: colors[i],
  }));


  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
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
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
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
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.secondary[100],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
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
          {!isDashboard && "Total:"} {sumNumOfSpecies(speciesObject)}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
