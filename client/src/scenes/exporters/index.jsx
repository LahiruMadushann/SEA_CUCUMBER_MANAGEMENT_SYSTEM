import React,{useState,useEffect} from "react";
import { Box, useTheme } from "@mui/material";
import { useGetExportersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Exporters = () => {
  const theme = useTheme();
  const [detail, setDetail] = useState(null);
  const [dataNew,setDataNew] = useState();
  const [loading, setLoading] = useState(true); // Added loading state
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {

  
    axios.get(`${baseUrl}/admin/getAllExporters`).then(response => {

      setDetail(response.data);
      setDataNew(detail.data)
     // Set loading to false when the response is received
      setIsLoading(false);

     
    });

  }, [detail]);
  // console.log("Exporter Data Tika",dataNew)

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 0.5,
    },
    {
      field: "firstName",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "contactNo",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "province",
      headerName: "Province",
      flex: 0.6,
    },
    {
      field: "town",
      headerName: "Town",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="EXPORTERS" subtitle="List of Exporters" />
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

export default Exporters;
