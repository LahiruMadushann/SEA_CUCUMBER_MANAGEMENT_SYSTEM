import React, { useMemo,useState,useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api";
import axios from "axios";

const FarmsData = () => {
  // const { data } = useGetSalesQuery();
  const theme = useTheme();
  const [detail, setDetail] = useState(null);
  const [data,setData] = useState();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  
  const [loading, setLoading] = useState(true); // Added loading state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/districtAquaCulturist/getAllAquaFarmingDetails`)
      .then((response) => {
        if (response.data && response.data.data) {
          setData(response.data.data); // Set data when the response is received
        } else {
          // Handle the case where the data is not as expected
          console.error("Data structure is not as expected:", response);
        }
      })
      .catch((error) => {
        // Handle the error when the request fails
        console.error("Failed to fetch data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  

console.log("Farm wla month",data)
const formattedData = useMemo(() => {
  if (!Array.isArray(data)) {
    return [];
  }

  const aggregatedData = {};
  data.forEach(({ month, stock, survival }) => {
    if (!aggregatedData[month]) {
      aggregatedData[month] = { month, stock: 0, survival: 0 };
    }
    aggregatedData[month].stock += stock;
    aggregatedData[month].survival += survival;
  });

  const chartData = Object.values(aggregatedData).map((entry) => ({
    x: entry.month,
    stock: entry.stock,
    survival: entry.survival,
  }));

  const stockData = {
    id: 'stock',
    color: '#ffff',
    data: chartData.map(item => ({ x: item.x, y: item.stock })),
  };

  const survivalData = {
    id: 'survival',
    color: '#07002b',
    data: chartData.map(item => ({ x: item.x, y: item.survival })),
  };

  return [stockData, survivalData];
}, [data]);


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Aqua Farm Data" subtitle="Chart of Stock and Survival" />
      <Box height="75vh">
        {data ? (
          <ResponsiveLine
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
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            // colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            // curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
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
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: -40,
                translateY: -53,
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
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default FarmsData;
