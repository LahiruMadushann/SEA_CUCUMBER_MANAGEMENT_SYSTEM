import React, { useState ,useContext} from "react";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from "components/Login";
import {useParams} from "react-router";



const LoginPage = () =>{
  const {userId} = useParams();
  console.log("New ID :",userId)
  // const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  // console.log("dataHuptho",data);
  // const { data, isLoading } = useGetAdminsQuery();
  // // console.log("data", data);
  // console.log(user._id)

  return (
    
    <Box m="1.5rem 2.5rem">
      <Login 
        user={data || {}} 
      />


    </Box>
  );
}
export default LoginPage;
