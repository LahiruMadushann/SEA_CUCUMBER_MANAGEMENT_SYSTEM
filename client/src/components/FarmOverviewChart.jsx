import React, { useMemo,useState,useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";
import axios from "axios";

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const [detail, setDetail] = useState(null);
  const [data,setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/districtAquaCulturist/getAllAquaFarmingDetails`)
      .then((response) => {
        setData(response.data.data || []);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [totalStockLine, totalSurvivalLine] = useMemo(() => {
    if (!data) return [[], []];

    const aggregatedData = data.reduce((acc, { month, stock, survival }) => {
      if (!acc[month]) {
        acc[month] = { month, stock: 0, survival: 0 };
      }
      acc[month].stock += stock;
      acc[month].survival += survival;
      return acc;
    }, {});

    const chartData = Object.values(aggregatedData).map((entry) => ({
      x: entry.month,
      stock: entry.stock,
      survival: entry.survival,
    }));

    return [
      [
        {
          id: "stock",
          color: theme.palette.secondary.main,
          data: chartData.map((item) => ({ x: item.x, y: item.stock })),
        },
      ],
      [
        {
          id: "survival",
          color: theme.palette.secondary[600],
          data: chartData.map((item) => ({ x: item.x, y: item.survival })),
        },
      ],
    ];
  }, [data, theme.palette.secondary.main, theme.palette.secondary[600]]);

  if (!data || isLoading){ 
    return "Loading...";
  }
    


  return (
   
    <ResponsiveLine
      data={view === "stock" ? totalStockLine : totalSurvivalLine}
   
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
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (v) {
            if (isDashboard) return v.slice(0, 3);
            return v;
          }
         
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: view === "stock" ? "Aqua Farming Stock" : "Aqua Farming Survival Stock",
        legendOffset: -60,
        legendPosition: "middle",
      }}
  
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      // legends={
      //   !isDashboard
      //     ? [
      //         {
      //           anchor: "bottom-right",
      //           direction: "column",
      //           justify: false,
      //           translateX: 75,
      //           translateY: -40,
      //           itemsSpacing: 0,
      //           itemDirection: "left-to-right",
      //           itemWidth: 80,
      //           itemHeight: 20,
      //           itemOpacity: 0.75,
      //           symbolSize: 12,
      //           symbolShape: "circle",
      //           symbolBorderColor: "rgba(0, 0, 0, .5)",
      //           effects: [
      //             {
      //               on: "hover",
      //               style: {
      //                 itemBackground: "rgba(0, 0, 0, .03)",
      //                 itemOpacity: 1,
      //               },
      //             },
      //           ],
      //         },
      //       ]
      //     : undefined
      // }
    />
  );
  
};

export default OverviewChart;
