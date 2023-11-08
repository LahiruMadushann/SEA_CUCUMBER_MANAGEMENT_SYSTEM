import React, { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import Swal from "sweetalert2";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { UserContext } from "../UserContext";
const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useContext(UserContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // const username = user.username;
  const dispatch = useDispatch();
  const theme = useTheme();
  //------------------------

  const userId = useSelector((state) => state.global.userId);

  const [detail, setDetail] = useState(null);

  const [loading, setLoading] = useState(true); // Added loading state
  // const [user, setUser] = useState(null); // Use state to manage user data



  const [pageLoaded, setPageLoaded] = useState(false); // Add pageLoaded state



  useEffect(() => {

    if (!userId) {
      if (loading) {
        // Render a loading indicator while waiting for the response
        return <div>Loading...</div>;
      }
      return <div>Loading...</div>;
    }
    axios.get(`${baseUrl}/user/${userId}`).then(response => {

      setDetail(response.data);

      setLoading(false); // Set loading to false when the response is received
      setPageLoaded(true);

      
    });

  }, [detail]);





  //-----------------




  // const { user, setUser } = useContext(UserContext);
  const navigate2 = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = async (event) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to Log Out !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3644C5",
      confirmButtonText: "Yes ",
      cancelButtonText: "No "
    });

    if (!isConfirmed) {
      return;
    }
    setAnchorEl(event.currentTarget);
    navigate2('/');
  }
  const handleClose = () => setAnchorEl(null);
  const [navigate, setNavigate] = useState(false);


  const goToProfile = () => {
    setNavigate(true);
  }




  if (navigate) {
    return <Navigate to='/userProfile' />
  }




  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {user && user.username ? ( // Check if user and username property exist
          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton onClick={goToProfile}>
              <SettingsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>

            <FlexBetween
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              {/* Other code... */}
              {user.profilepic && (
                <Box
                  component="img"
                  alt="profile"
                  src={require(`../../../backend/Images/profilePics/${user.profilepic}`)}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
              )}
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.username}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.role}
                </Typography>
              </Box>
              <Button
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                <LogoutOutlinedIcon
                  sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
            </FlexBetween>
          </FlexBetween>
        ) : pageLoaded ? ( // Check if the user data has loaded
          // If user data is not available, display details from `detail` object

          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton onClick={goToProfile}>
              <SettingsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>
            <FlexBetween
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              {detail && detail.profilepic && (
                <Box
                  component="img"
                  alt="profile"
                  src={require(`../../../backend/Images/profilePics/${detail.profilepic}`)}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
              )}
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {detail.username}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {detail.role}
                </Typography>
              </Box>
              <Button
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                <LogoutOutlinedIcon
                  sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
            </FlexBetween>
          </FlexBetween>
        ) : (
          <div>Loading...</div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
