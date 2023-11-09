import React, { useMemo,useState,useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";
import axios from "axios";

const FishViewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const [detail, setDetail] = useState(null);
  const [data,setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {

  
    axios.get(`${baseUrl}/fisheriesdashboard/getAllFishingDetails`).then(response => {

      setDetail(response.data);
      
      setData(detail.data)
    
      // setData(detail.data)
     // Set loading to false when the response is received
      setIsLoading(false);

     
    });

  }, [detail]);

  // const [numOfSpeciesLine, buyingPricelLine] = useMemo(() => {
  //   if (!data) return [];

  //   const  monthlyData = data;
   
  //   const numOfSpeciesLine = {
  //     id: "numOfSpecies",
  //     color: theme.palette.secondary.main,
  //     data: [],
  //   };
  //   const buyingPricelLine = {
  //     id: "buyingPrice",
  //     color: theme.palette.secondary[600],
  //     data: [],
  //   };

  //   Object.values(monthlyData).reduce(
  //     (acc, { speciesType, numOfSpecies, buyingPrice }) => {
  //       const numSpecies = acc.species + numOfSpecies;
  //       const getPrice = acc.price + buyingPrice;
        
  //       numOfSpeciesLine.data = [
  //         ...numOfSpeciesLine.data,
  //         { x: speciesType, y: numSpecies },
  //       ];
  //       buyingPricelLine.data = [
  //         ...buyingPricelLine.data,
  //         { x: speciesType, y: getPrice },
  //       ];

  //       return { species: numSpecies, price: getPrice };
  //     },
  //     { species: 0, price: 0 }
  //   );

  //   return [[numOfSpeciesLine], [buyingPricelLine]];
  // }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const numberOfSpeciesChart = useMemo(() => {
    if (isLoading || !data) return [];
  
    const speciesTypeMap = {};
  
    // Aggregate data based on speciesType
    data.forEach(({ speciesType, numOfSpecies }) => {
      if (speciesTypeMap[speciesType]) {
        speciesTypeMap[speciesType] += numOfSpecies;
      } else {
        speciesTypeMap[speciesType] = numOfSpecies;
      }
    });
  
    // Transform aggregated data into chart format
    const chartData = Object.keys(speciesTypeMap).map((speciesType) => ({
      x: speciesType,
      y: speciesTypeMap[speciesType],
    }));
  
    return [
      {
        id: "numOfSpecies",
        color: theme.palette.secondary.main,
        data: chartData,
      },
    ];
  }, [isLoading, data, theme.palette.secondary.main]);
  
  
  
  
  

  //Jjjj
  const buyingPriceChart = useMemo(() => {
    if (isLoading || !data) return [];
  
    const speciesTypeMap = {};
  
    // Aggregate data based on speciesType
    data.forEach(({ speciesType, numOfSpecies }) => {
      if (speciesTypeMap[speciesType]) {
        speciesTypeMap[speciesType] += numOfSpecies;
      } else {
        speciesTypeMap[speciesType] = numOfSpecies;
      }
    });
  
    // Transform aggregated data into chart format, avoiding repetition
    const chartData = Object.keys(speciesTypeMap).map((speciesType) => ({
      x: speciesType,
      y: speciesTypeMap[speciesType],
    }));
  
    return [
      {
        id: "numOfSpecies",
        color: theme.palette.secondary.main,
        data: chartData,
      },
    ];
  }, [isLoading, data, theme.palette.secondary.main]);
  


  if (!data || isLoading){ 
    return "Loading...";
  }
    


  return (
   
    <ResponsiveLine
      data={view === "numOfSpecies" ? numberOfSpeciesChart : buyingPriceChart}  
   
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
        legend: "Species Type",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: view === "numOfSpecies" ? "Number of Species " : "Buying Price",
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

export default FishViewChart;
