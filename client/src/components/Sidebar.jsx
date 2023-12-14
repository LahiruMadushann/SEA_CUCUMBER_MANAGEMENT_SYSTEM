import React, { useContext } from "react";
import axios from "axios";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import WaterDamageOutlinedIcon from "@mui/icons-material/WaterDamageOutlined";
import KayakingOutlinedIcon from "@mui/icons-material/KayakingOutlined";
import SlowMotionVideoOutlinedIcon from "@mui/icons-material/SlowMotionVideoOutlined";
import ConnectingAirportsOutlinedIcon from "@mui/icons-material/ConnectingAirportsOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "state/api";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import SetMealOutlinedIcon from "@mui/icons-material/SetMealOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { UserContext } from "../UserContext";
import { jwtDecode } from "jwt-decode";
// import {useParams} from "react-router";

const navItems = [
  {
    text: "Dashboard Section",
    icon: null,
  },

  // {
  //   text: "Dashboard",
  //   icon: <HomeOutlined />,
  // },
  {
    text: "Fishing Dashboard",
    icon: <SetMealOutlinedIcon />,
  },
  {
    text: "Farming Dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  //---------------

  {
    text: "Management",
    icon: null,
  },
  // {
  //   text: "Admin",
  //   icon: <AdminPanelSettingsOutlined />,
  // },
  // {
  //   text: "Performance",
  //   icon: <TrendingUpOutlined />,
  // },

  {
    text: "Remove Users",
    icon: <PersonRemoveOutlinedIcon />,
  },
  ,
  {
    text: "Activate Users",
    icon: <GroupAddOutlinedIcon />,
  },
  {
    text: "Messages",
    icon: <ContactMailOutlinedIcon />,
  },
  {
    text: "Contact Us",
    icon: <ContactPhoneOutlinedIcon />,
  },
  {
    text: "Article Section",
    icon: null,
  },
  {
    text: "Add Article",
    icon: <AutoStoriesOutlinedIcon />,
  },
  {
    text: "Update and Delete",
    icon: <ImportContactsOutlinedIcon />,
  },

  //---------------
  //---------------
  {
    text: "Knowledge Center",
    icon: null,
  },

  {
    text: "Enter Knowledge Center Data",
    icon: <SchoolOutlinedIcon />,
  },
  {
    text: "Delete and Update",
    icon: <RestoreFromTrashOutlinedIcon />,
  },
  //---------------
  {
    text: "FAQS",
    icon: null,
  },
  {
    text: "Enter FAQS Data",
    icon: <QuizOutlinedIcon />,
  },
  {
    text: "Delete & Update",
    icon: <RestoreFromTrashOutlinedIcon />,
  },
  //-----------------------------
  {
    text: "Other Actions",
    icon: null,
  },
  {
    text: "Register Management Users",
    icon: <HowToRegOutlinedIcon />,
  },
  {
    text: "Management Users",
    icon: <ManageAccountsOutlinedIcon />,
  },
  // {
  //   text: "Farmers",
  //   icon: <ReceiptLongOutlined />,
  // },
  //-----------------------------
  {
    text: "Aquaculture Farms Section",
    icon: null,
  },

  {
    text: "Aquaculture Farms",
    icon: <WaterDamageOutlinedIcon />,
  },
  {
    text: "Aquaculture Farmers",
    icon: <KayakingOutlinedIcon />,
  },
  {
    text: "Farms Chart",
    icon: <StackedLineChartOutlinedIcon />,
  },
  {
    text: "District AquaCulturist",
    icon: <PersonPinCircleOutlinedIcon />,
  },
  {
    text: "Farm Overview",
    icon: <PointOfSaleOutlined />,
  },

  //---------------
  //---------------
  {
    text: "Fisheries Section",
    icon: null,
  },
  {
    text: "Fisheries Management Users",
    icon: <ManageAccountsOutlinedIcon />,
  },
  {
    text: "Fishermens",
    icon: <KayakingOutlinedIcon />,
  },

  {
    text: "Fishing Chart",
    icon: <PieChartOutlined />,
  },
  {
    text: "Fish Overview",
    icon: <PointOfSaleOutlined />,
  },

  //---------------

  //---------------
  {
    text: "Exporters and Processors",
    icon: null,
  },
  {
    text: "Exporters",
    icon: <ConnectingAirportsOutlinedIcon />,
  },
  {
    text: "Processors",
    icon: <SlowMotionVideoOutlinedIcon />,
  },

  //---------------
  //---------------
  // {
  //   text: "Aquaculture Farms Section Data",
  //   icon: null,

  // },
  // {
  //   text: "Aquaculture Management",
  //   icon: <ManageAccountsOutlinedIcon />,
  // },

  // {
  //   text: "Farmers Data",
  //   icon: <KayakingOutlinedIcon />,
  // },

  //---------------
  //---------------
  // {
  //   text: "Fisheries Data",
  //   icon: null,
  // },
  // {
  //   text: "Fisheries Management ",
  //   icon: <ManageAccountsOutlinedIcon />,
  // },
  // {
  //   text: "Fishermens Data",
  //   icon: <KayakingOutlinedIcon />,
  // },
  // {
  //   text: "FishProcessors Data",
  //   icon: <ReceiptLongOutlined />,
  // },

  //---------------
  // {
  //   text: "Client Facing",
  //   icon: null,
  // },
  // {
  //   text: "Products",
  //   icon: <ShoppingCartOutlined />,
  // },
  // // {
  // //   text: "Customers",
  // //   icon: <Groups2Outlined />,
  // // },
  // // {
  // //   text: "Transactions",
  // //   icon: <ReceiptLongOutlined />,
  // // },
  // {
  //   text: "Geography",
  //   icon: <PublicOutlined />,
  // },
  // {
  //   text: "Sales",
  //   icon: null,
  // },

  // {
  //   text: "Daily",
  //   icon: <TodayOutlined />,
  // },
  // {
  //   text: "Monthly",
  //   icon: <CalendarMonthOutlined />,
  // },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const [active, setActive] = useState("");
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const userId = useSelector((state) => state.global.userId);

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  // const [user, setUser] = useState(null); // Use state to manage user data
  console.log("user ge al", userId);

  useEffect(() => {
    setCurrentPath(location.pathname.replace(/\//g, "").toLowerCase());
    // const currentPath = location.pathname.replace(/\//g, "").toLowerCase();
    setActive(currentPath);
  }, [currentPath]);

  const [pageLoaded, setPageLoaded] = useState(false); // Add pageLoaded state
  useEffect(() => {
    if (!userId) {
      if (loading) {
        // Render a loading indicator while waiting for the response
        return <div>Loading...</div>;
      }
      return <div>Loading...</div>;
    }
    axios.get(`${baseUrl}user/${userId}`).then((response) => {
      setDetail(response.data);

      setLoading(false); // Set loading to false when the response is received
      setPageLoaded(true);
    });
  }, [detail]);

  const filteredNavItems = navItems.filter((item) => {
    if (user || detail) {
      if (user) {
        if (user.role === "Farmer") {
          return [
            "Farming Dashboard",
            "Aquaculture Farms Section",
            "Aquaculture Farms",
            "Aquaculture Farmers",
            "Farms Chart",
            "Overview",
          ].includes(item.text);
        } else if (user.role === "Fisherman") {
          return [
            "Fishing Dashboard",
            "Fisheries Section",
            "Fisheries Management Users",
            "Fishermen",
            "Fishing Chart",
          ].includes(item.text);
        } else if (user.role === "Processor") {
          return [
            "Fishing Dashboard",
            "Farming Dashboard",
            "Aquaculture Farms Section",
            "Aquaculture Farms",
            "Aquaculture Farmers",
            "Farms Chart",
            "Overview",
            "Fisheries Section",
            "Fisheries Management Users",
            "Fishermen",
            "Fishing Chart",
          ].includes(item.text);
        } else if (user.role === "Exporter") {
          return [
            "Fishing Dashboard",
            "Farming Dashboard",
            "Aquaculture Farms Section",
            "Aquaculture Farms",
            "Aquaculture Farmers",
            "Farms Chart",
            "Overview",
            "Fisheries Section",
            "Fisheries Management Users",
            "Fishermens",
            "Fishing Chart",
            "Exporters and Processors",
            "Exporters",
            "Processors",
            "Aquaculture Farms Section Data",
            "Farmers Data",
            "Fisheries Data",
            "Fishermens Data",
            "Fish Processors Data",
          ].includes(item.text);
        } else if (
          user.role === "Assistant Director"
        ) {
          return [
            "Farming Dashboard",
            "Aquaculture Farms Section",
            "Aquaculture Farms",
            "Aquaculture Farmers",
            "Farms Chart",
            "District AquaCulturist",
            "Farm Overview",
          ].includes(item.text);
        } else {
          return true;
        }
      } else {
        if (detail.role === "Farmer") {
          return [
            "Farming Dashboard",
            "Aquaculture Farms Section",
            "Aquaculture Farms",
            "Aquaculture Farmers",
            "Farms Chart",
            "Overview",
          ].includes(item.text);
        } else if (detail.role === "Fisherman") {
          return [
            "Fishing Dashboard",
            "Fisheries Section",
            "Fisheries Management Users",
            "Fishermen",
            "Fishing Chart",
          ].includes(item.text);
        } else if (detail.role === "Processor") {
          return [
            "Fishing Dashboard",
            "Farming Dashboard",
            "Aquaculture Farms Section",
            "Aquaculture Farms",
            "Aquaculture Farmers",
            "Farms Chart",
            "Overview",
            "Fisheries Section",
            "Fisheries Management Users",
            "Fishermen",
            "Fishing Chart",
          ].includes(item.text);
        } else if (detail.role === "Exporter") {
          return [
            "Fishing Dashboard",
            "Farming Dashboard",
            "Aquaculture Farms Section",
            "Aquaculture Farms",
            "Aquaculture Farmers",
            "Farms Chart",
            "Overview",
            "Fisheries Section",
            "Fisheries Management Users",
            "Fishermens",
            "Fishing Chart",
            "Exporters and Processors",
            "Exporters",
            "Processors",
            "Aquaculture Farms Section Data",
            "Farmers Data",
            "Fisheries Data",
            "Fishermens Data",
            "Fish Processors Data",
          ].includes(item.text);
        } else if (
          detail.role === "Assistant Director"
        ) {
          return [
            "Farming Dashboard",
            "Aquaculture Farms Section",
            "Aquaculture Farms",
            "Aquaculture Farmers",
            "Farms Chart",
            "District AquaCulturist",
            "Farm Overview",
          ].includes(item.text);
        } else {
          return true;
        }
      }
    } else {
      return <div>Loading....</div>;
    }
  });
  // useEffect(() => {
  //   filteredNavItems();
  // }, [user]);

  console.log("aluth data", detail);

  // useEffect(() => {
  //   setActive(pathname.substring(1));
  // }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    SEACUCUMBER
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {filteredNavItems.map(({ text, icon }) => {
                // let newText = text.replace(/ /g, '');
                // console.log(newText)
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                const lcTextNew = lcText.replace(/ /g, "");

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcTextNew}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[100]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.secondary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.secondary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "4vw" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="-98rem" paddingBottom="25px">
            <Divider />

            {/* <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              
                <Box
                  component="img"
                  alt="profile"
                  src={user.profilepic
                    ? require(`../../../backend/uploads/${user.profilepic}`)
                    : `../../../backend/uploads/profile new.jpg`
                     // Provide a placeholder image path
                  }
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
              
          
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user.username}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
              
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
              
            </FlexBetween>
             */}
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
