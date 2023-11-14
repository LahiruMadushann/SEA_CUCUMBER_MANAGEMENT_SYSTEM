import React, { useMemo, useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar"; // Import the bar chart component
import { useTheme } from "@mui/material";
import axios from "axios";

const FishViewPriceBarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const [detail, setDetail] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios.get(`${baseUrl}/fisheriesdashboard/getAllFishingDetails`).then((response) => {
      setDetail(response.data);
      setData(response.data.data); // Update data directly from the response
      setIsLoading(false);
    });
  }, []); // Removed [detail] as a dependency

  const speciesTypeData = useMemo(() => {
    if (isLoading || !data) return [];

    const speciesTypeMap = {};

    // Aggregate data based on speciesType
    data.forEach(({ speciesType, buyingPrice }) => {
      if (speciesTypeMap[speciesType]) {
        speciesTypeMap[speciesType] += buyingPrice;
      } else {
        speciesTypeMap[speciesType] = buyingPrice;
      }
    });

    // Transform aggregated data into chart format
    const chartData = Object.keys(speciesTypeMap).map((speciesType) => ({
      speciesType,
      buyingPrice: speciesTypeMap[speciesType],
    }));

    return chartData;
  }, [isLoading, data]);

  if (!data || isLoading) {
    return "Loading...";
  }

  return (
    <div style={{ transform: "rotate(0deg)",  height: "600px", width: "80vw" }}>
      <ResponsiveBar
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
        data={speciesTypeData}
        keys={["buyingPrice"]}
        indexBy="speciesType"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        margin={{ top: 200, right: 650, bottom: 50, left: 70 }}
        layout="vertical"
        enableGridX={true}
        enableGridY={false}
        padding={0.8}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: (v) => {
            if (v) {
              if (isDashboard) return v.slice(0, 3);
              return v;
            }
           
          },
          legend: 'Buying Price',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Species Type',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
       
        
      />
    </div>
  );
};

export default FishViewPriceBarChart;
