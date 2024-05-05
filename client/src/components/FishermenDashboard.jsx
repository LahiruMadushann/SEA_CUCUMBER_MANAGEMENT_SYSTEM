import React, { useState, useEffect, useContext } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import axios from "axios";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/FarmOverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { UserContext } from "../UserContext";
import FishViewChart from "./FishViewChart";
import FishViewBarChart from "./FishViewTotalBarChart";
import FishViewPriceBarChart from "./FishViewPriceBarChart";
import jsPDF from "jspdf";
import "jspdf-autotable";




const FishermenDashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // const { data, isLoading } = useGetDashboardQuery();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const userId = useSelector((state) => state.global.userId);
  const [userDetail, setUserDetail] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {


    axios.get(`${baseUrl}/fisheriesdashboard/getAllFishingDetails`).then(response => {

      // setDetail(response.data);
      setData(response.data.data)
      // Set loading to false when the response is received
      setIsLoading(false);

      console.log("Dashboard Data", data)
    });

  }, [data]);

  const handleDownloadReports = () => {
    const element = document.getElementById("reports-container");

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a3"); // Portrait orientation, millimeters, A4 size

      // Add current date and time
      const currentDate = new Date();
      const dateString = currentDate.toLocaleDateString();
      const timeString = currentDate.toLocaleTimeString();
      const dateTime = `${dateString} ${timeString}`;
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100); // Adjust font color
      pdf.text(dateTime, 10, 10); // Adjust position (x, y)

      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0); // Black font color
      const companyName = "Seacucumber Report";
      const subName = "Report Details"; // Your sub name
      const textWidth = pdf.getStringUnitWidth(companyName) * 18 / pdf.internal.scaleFactor;
      const x = (pdf.internal.pageSize.getWidth() - textWidth) / 2;
      pdf.text(companyName, x, 25); // Centered horizontally, adjust y position as needed

      // Subname below the company name
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100); // Adjust font color
      const subNameWidth = pdf.getStringUnitWidth(subName) * 12 / pdf.internal.scaleFactor;
      const subNameX = (pdf.internal.pageSize.getWidth() - subNameWidth) / 2;
      pdf.text(subName, subNameX, 35); // Adjust y position as needed

      // Add image content
      pdf.addImage(imgData, 0, 45, 297, 400); // Adjust position and dimensions

      pdf.save("seacucumber-report.pdf");
    });
  };


  const handleDownloadReports2 = () => {
    const pdf = new jsPDF();
    
    const columns = [
      { title: "Fishing Area", dataKey: "fishingArea" },
      { title: "Species Type", dataKey: "speciesType" },
      { title: "Num Of Species", dataKey: "numOfSpecies" },
      { title: "Buyer", dataKey: "buyer" },
      { title: "Buying Price", dataKey: "buyingPrice" },
    ];
  
    pdf.autoTable({
      head: [columns.map(column => column.title)],
      body: data.map(row => columns.map(column => row[column.dataKey])),
    });
  
    pdf.save("seacucumber-report-2.pdf");
  };
  
  
  const columns = [
    // {
    //   field: "_id",
    //   headerName: "ID",
    //   flex: 1,
    // },
    {
      field: "fishingArea",
      headerName: "Fishing Area",
      flex: 1,
    },
    {
      field: "speciesType",
      headerName: "Species Type",
      flex: 1.3,
    },
    {
      field: "numOfSpecies",
      headerName: "Num Of Species",
      flex: 0.8,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.8,

    },
    {
      field: "buyingPrice",
      headerName: "Buying Price",
      flex: 0.8,

    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="FISHERIES SECTION DASHBOARD" subtitle="Welcome to fisheries section dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleDownloadReports}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>

      </FlexBetween>

      <Box
        id="reports-container"
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >

        {/* Dashboard Chart */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <FishViewChart view="numOfSpecies" isDashboard={true} />
          {/* <OverviewChart view="stock" isDashboard={true} /> */}
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <FishViewChart view="buyingPrice" isDashboard={true} />
        </Box>


        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              width:"51vw"
              
            }}
            onClick={handleDownloadReports2}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Table
          </Button>
        </Box>
          <DataGrid
          id="data-grid-table"
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            // rows={(data && data.transactions) || []}
            rows={data || []}
            columns={columns}
            sx={{height:"63.6vh"}}
          />
          
        </Box>
        
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Fishing Species Detail
          </Typography>
       
          <BreakdownChart isDashboard={true} />
       
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real species type and number of species via category for revenue
            made for this year and species detail.
          </Typography>
        </Box>
        <Box gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem">
          <Typography variant="h5" sx={{
            marginBottom: "-8vw",
            textAlign: "center",
            color: theme.palette.secondary[100]
          }}>
            Species Type and Their Total
          </Typography>

          {data ? (
            <FishViewBarChart view="numOfSpecies" isDashboard={true} />
          ) : (
            "Loading..."
          )}
        </Box>
        <Box gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem">
          <Typography variant="h5" sx={{
            marginBottom: "-8vw",
            textAlign: "center",
            color: theme.palette.secondary[100]
          }}>
            Species Type and Their Buying Price
          </Typography>

          {data ? (
            <FishViewPriceBarChart isDashboard={true} />
          ) : (
            "Loading..."
          )}
        </Box>
      </Box>
    </Box>
  );
}
export default FishermenDashboard;