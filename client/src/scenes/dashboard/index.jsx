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
import FarmingDashboard from "components/FarmingDashboard";


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

  //Get Dashboard Acoording to User Role
  if (user || userDetail) {
    if(user){
      if (user.role === 'Farmer') {
        return <FarmingDashboard />
      } else if (user.role === 'Fisherman') {
        return <FishermenDashboard />;
      
      } else {
        return <DashboardComponent />;
      }
    }else {
      if (userDetail.role === 'Farmer') {
          return <FarmingDashboard />
      } else if (userDetail.role === 'Fisherman') {
        return <FishermenDashboard />; 
      } else {
        return <DashboardComponent />;
      }
    }
    
  } else {
    return <div>Loading....</div>
  }

};

export default Dashboard;
