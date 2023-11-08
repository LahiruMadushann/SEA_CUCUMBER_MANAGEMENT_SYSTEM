import React,{useState,useEffect} from "react";
import { Box, useTheme } from "@mui/material";
import { useGetFarmersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const DistrictAquaculturist = () => {
  const theme = useTheme();
  const [detail, setDetail] = useState(null);
  const [dataNew,setDataNew] = useState();
  const [loading, setLoading] = useState(true); // Added loading state
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {

  
    axios.get(`${baseUrl}/districtAquaCulturist/getAllAquaFarmingDetails`).then(response => {

      setDetail(response.data);
      setDataNew(detail.data)
     // Set loading to false when the response is received
      setIsLoading(false);

     console.log("aluth data",dataNew)
    });

  }, [detail]);

//  setData(...detail)

  // const { data, isLoading } = useGetFarmersQuery();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const columns = [
    {
      field: "farmId",
      headerName: "Farm Id",
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 0.5,
    },
    {
      field: "stockingDates",
      headerName: "Stocking Dates",
      flex: 0.5,
      valueFormatter: (params) => formatDate(params.value),
    },
    {
      field: "hatchery",
      headerName: "Hatchery",
      flex: 1,
    },
    {
      field: "hatcheryBatch",
      headerName: "Hatchery Batch",
      flex: 0.5,
      
    },
    {
      field: "harvest",
      headerName: "Harvest",
      flex: 0.5,
      valueFormatter: (params) => formatDate(params.value),
    },
    {
      field: "size",
      headerName: "Size",
      flex: 0.5,
    },
    {
      field: "survival",
      headerName: "Survival",
      flex: 0.5,
    },
    {
        field: "diseases",
        headerName: "Diseases",
        flex: 0.5,
      },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DISTRICT AQUACULTURIST" subtitle="List of District Aquaculturist" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !dataNew}
          getRowId={(row) => row._id}
          rows={dataNew || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default DistrictAquaculturist;
