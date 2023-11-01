import React,{useState,useEffect} from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const AquacultureFarms = () => {
  const theme = useTheme();
  const [detail, setDetail] = useState(null);
  const [dataNew,setDataNew] = useState();
  const [loading, setLoading] = useState(true); // Added loading state
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {

  
    axios.get(`${baseUrl}/admin/getAllFarms`).then(response => {

      setDetail(response.data);
      setDataNew(detail.data)
     // Set loading to false when the response is received
      setIsLoading(false);

     
    });

  }, [detail]);
 

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "farmInternal",
      headerName: "Farm Internal",
      flex: 0.5,
     
    },
    {
      field: "location",
      headerName: "Location",
      flex: 0.5,
     
    },
    {
      field: "licenseNo",
      headerName: "License No",
      flex: 1,
    },
    {
      field: "extend",
      headerName: "Extend",
      flex: 0.4,
    },
    // {
    //   field: "role",
    //   headerName: "Role",
    //   flex: 0.5,
    // },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="AQUACULTURE FARMS" subtitle="List of Aquaculture Farms" />
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

export default AquacultureFarms;
