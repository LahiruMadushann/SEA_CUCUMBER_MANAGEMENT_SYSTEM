import React, { useMemo,useState,useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";
import axios from "axios";

const FarmViewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const [detail, setDetail] = useState(null);
  const [data,setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {

  
    axios.get(`${baseUrl}/districtAquaCulturist/getAllAquaFarmingDetails`).then(response => {

      setDetail(response.data);
      
      setData(detail.data)
    
      // setData(detail.data)
     // Set loading to false when the response is received
      setIsLoading(false);

     
    });

  }, [detail]);

  // const [totalStockLine, totalSurvivalLine] = useMemo(() => {
  //   if (!data) return [];

  //   const  monthlyData = data;
   
  //   const totalStockLine = {
  //     id: "stock",
  //     color: theme.palette.secondary.main,
  //     data: [],
  //   };
  //   const totalSurvivalLine = {
  //     id: "survival",
  //     color: theme.palette.secondary[600],
  //     data: [],
  //   };

  //   Object.values(monthlyData).reduce(
  //     (acc, { month, stock, survival }) => {
  //       const curStock = acc.sales + stock;
  //       const curSurvival = acc.units + survival;
        
  //       totalStockLine.data = [
  //         ...totalStockLine.data,
  //         { x: month, y: curStock },
  //       ];
  //       totalSurvivalLine.data = [
  //         ...totalSurvivalLine.data,
  //         { x: month, y: curSurvival },
  //       ];

  //       return { sales: curStock, units: curSurvival };
  //     },
  //     { sales: 0, units: 0 }
  //   );

  //   return [[totalStockLine], [totalSurvivalLine]];
  // }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  //Stock Chart
const numberOfSpeciesChart = useMemo(() => {
  if (isLoading || !data) return [];

  const totalSpeciesMap = {};

  // Aggregate data based on speciesType
  data.forEach(({ month, stock }) => {
    if (totalSpeciesMap[month]) {
      totalSpeciesMap[month] += stock;
    } else {
      totalSpeciesMap[month] = stock;
    }
  });

  // Transform aggregated data into chart format
  const chartData = Object.keys(totalSpeciesMap).map((month) => ({
    x: month,
    y: totalSpeciesMap[month],
  }));

  return [
    {
      id: "stock",
      color: theme.palette.secondary.main,
      data: chartData,
    },
  ];
}, [isLoading, data, theme.palette.secondary.main]);
//

  //Survival Chart
  const numberOfSurvivalSpeciesChart = useMemo(() => {
    if (isLoading || !data) return [];
  
    const totalSurvivalSpeciesMap = {};
  
    // Aggregate data based on speciesType
    data.forEach(({ month, survival }) => {
      if (totalSurvivalSpeciesMap[month]) {
        totalSurvivalSpeciesMap[month] += survival;
      } else {
        totalSurvivalSpeciesMap[month] = survival;
      }
    });
  
    // Transform aggregated data into chart format
    const chartData = Object.keys(totalSurvivalSpeciesMap).map((month) => ({
      x: month,
      y: totalSurvivalSpeciesMap[month],
    }));
  
    return [
      {
        id: "survival",
        color: theme.palette.secondary.main,
        data: chartData,
      },
    ];
  }, [isLoading, data, theme.palette.secondary.main]);
  //

  if (!data || isLoading){ 
    return "Loading...";
  }
    


  return (
   
    <ResponsiveLine
      data={view === "stock" ? numberOfSpeciesChart : numberOfSurvivalSpeciesChart}
   
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
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
  
};

export default FarmViewChart;
