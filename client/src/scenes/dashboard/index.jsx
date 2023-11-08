import React, { useState,useEffect,useContext } from "react";
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
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { UserContext } from "../../UserContext";
import DashboardComponent from "components/DasboardComponent";
import FishermenDashboard from "components/FishermenDashboard";


const Dashboard = () => {
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
  //selcting user
useEffect(() => {

  if (!userId) {
    if (loading) {
      // Render a loading indicator while waiting for the response
      return <div>Loading...</div>;
    }
    return <div>Loading...</div>;
  }
  axios.get(`${baseUrl}/user/${userId}`).then(response => {

    setUserDetail(response.data);
    setLoading(false);
    console.log("user new new",userDetail.role)
  
  });

}, [userDetail]);

  // useEffect(() => {

  
  //   axios.get(`${baseUrl}/fisheriesdashboard/getAllFishingDetails`).then(response => {

  //     // setDetail(response.data);
  //     setData(response.data.data)
  //    // Set loading to false when the response is received
  //     setIsLoading(false);
      
  //     console.log("Dashboard Data", data)
  //   });

  // }, [data]);



  // const handleDownloadReports = () => {
  //   const element = document.getElementById("reports-container");

  //   html2canvas(element).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a3"); // Portrait orientation, millimeters, A4 size

  //     // Add current date and time
  //     const currentDate = new Date();
  //     const dateString = currentDate.toLocaleDateString();
  //     const timeString = currentDate.toLocaleTimeString();
  //     const dateTime = `${dateString} ${timeString}`;
  //     pdf.setFontSize(10);
  //     pdf.setTextColor(100, 100, 100); // Adjust font color
  //     pdf.text(dateTime, 10, 10); // Adjust position (x, y)

  //     pdf.setFontSize(18);
  //     pdf.setTextColor(0, 0, 0); // Black font color
  //     const companyName = "Seacucumber Report";
  //     const subName = "Report Details"; // Your sub name
  //     const textWidth = pdf.getStringUnitWidth(companyName) * 18 / pdf.internal.scaleFactor;
  //     const x = (pdf.internal.pageSize.getWidth() - textWidth) / 2;
  //     pdf.text(companyName, x, 25); // Centered horizontally, adjust y position as needed

  //     // Subname below the company name
  //     pdf.setFontSize(12);
  //     pdf.setTextColor(100, 100, 100); // Adjust font color
  //     const subNameWidth = pdf.getStringUnitWidth(subName) * 12 / pdf.internal.scaleFactor;
  //     const subNameX = (pdf.internal.pageSize.getWidth() - subNameWidth) / 2;
  //     pdf.text(subName, subNameX, 35); // Adjust y position as needed

  //     // Add image content
  //     pdf.addImage(imgData, 0, 45, 297, 400); // Adjust position and dimensions

  //     pdf.save("seacucumber-report.pdf");
  //   });
  // };


  //Get Dashboard Acoording to User Role
  if (user || userDetail) {
    if(user){
      if (user.role === 'Admin') {
        //return <DashboardComponent />
        return <FishermenDashboard />;
      } else if (user.role === 'Fisherman') {
        // show only specific items for manager users
        return <FishermenDashboard />;
      } else if (user.role === 'farmer') {
        // show only specific items for farmer users
        return true;
      } else if (user.role === 'exporter') {
        return true;
      } else {
        // show only specific items for other users
        return true;
      }
    }else {
      if (userDetail.role === 'Admin') {
      
          // return <DashboardComponent />
          return <FishermenDashboard />;
      } else if (userDetail.role === 'Fisherman') {
        // show only specific items for manager users
        return <FishermenDashboard />;
      } else if (userDetail.role === 'farmer') {
        // show only specific items for farmer users
        return true;
      } else if (userDetail.role === 'exporter') {
        return true;
      } else {
        // show only specific items for other users
        return true;
      }
    }
    
  } else {
    return <div>Loading....</div>
  }


  //----------------------------------









  
};

export default Dashboard;
