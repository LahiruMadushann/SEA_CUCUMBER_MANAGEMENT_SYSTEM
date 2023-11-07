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
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import WaterDamageOutlinedIcon from '@mui/icons-material/WaterDamageOutlined';
import KayakingOutlinedIcon from '@mui/icons-material/KayakingOutlined';
import SlowMotionVideoOutlinedIcon from '@mui/icons-material/SlowMotionVideoOutlined';
import ConnectingAirportsOutlinedIcon from '@mui/icons-material/ConnectingAirportsOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "state/api";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import { UserContext } from "../UserContext";
import { jwtDecode } from 'jwt-decode';
// import {useParams} from "react-router";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
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
  
  //-----------------------------
  {
    text: "Other Actions",
    icon: null,
  },
  {
    text: "Register Management Users",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Farmers",
    icon: <ReceiptLongOutlined />,
  },
  //-----------------------------
  {
    text: "Aquaculture Farms Section",
    icon: null,
  },
  {
    text: "Management Aquaculture Users",
    icon: <ManageAccountsOutlinedIcon />,
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
    text: "Farms Data",
    icon: <WaterDamageOutlinedIcon />,
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
  {
    text: "Aquaculture Farms Section Data",
    icon: null,
  },
  {
    text: "Aquaculture Management",
    icon: <ManageAccountsOutlinedIcon />,
  },
  
  {
    text: "Farmers Data",
    icon: <KayakingOutlinedIcon />,
  },



  //---------------
  //---------------
  {
    text: "Fisheries Data",
    icon: null,
  },
  {
    text: "Fisheries Management ",
    icon: <ManageAccountsOutlinedIcon />,
  },
  {
    text: "Fishermens Data",
    icon: <KayakingOutlinedIcon />,
  },
  {
    text: "FishProcessors Data",
    icon: <ReceiptLongOutlined />,
  },



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
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
 
  
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
  const navigate = useNavigate();
  const theme = useTheme();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  
  
  const userId = useSelector((state) => state.global.userId);

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  // const [user, setUser] = useState(null); // Use state to manage user data
console.log("user ge al",userId)

  useEffect(() => {
    const currentPath = location.pathname.replace(/\//g, "").toLowerCase();
    setActive(currentPath);

  }, [location.pathname]);

  const [pageLoaded, setPageLoaded] = useState(false); // Add pageLoaded state
  useEffect(() => {

    if (!userId) {
      if (loading) {
        // Render a loading indicator while waiting for the response
        return <div>Loading...</div>;
      }
      return <div>Loading...</div>;
    }
    axios.get(`${baseUrl}user/${userId}`).then(response => {

      setDetail(response.data);

      setLoading(false); // Set loading to false when the response is received
      setPageLoaded(true); 
     
    });

  }, [detail]);







  // const { data, error, isLoading } = useGetUserQuery(userId);
  // const { data: user } = useGetUserQuery(userName, {
  //   skip: !userName,
  //   refetchOnMountOrArgChange: true,
  // });

  // const { data: userNew } = useGetUserQuery(userId, {
  //   skip: !userId,
  //   refetchOnMountOrArgChange: true,
  // });

  // async function handleLoginSubmit(e) {
  //   e.preventDefault();

  //   if (user && user.password === password) {
  //     alert("Login successful");
  //     console.log(user)
  //     setUser(user); // Set user context here if needed
  //     navigate("/dashboard"); // Redirect to dashboard
  //   } else {
  //     alert("Login failed");
  //     setUserName('');
  //     setPassword('');
  //   }
  // }




  // console.log("User Role paiyo", detail.role);

  // console.log("Error fetching data", error);
  // console.log("Loading", isLoading);


  // const [userData, setUserData] = useState(null);

  // setUserData(data);
  // console.log("hyyy",userData.name)

  // if (!pageLoaded || !user) {
  //   return null; // Render nothing or a loading indicator
  // }


  // useEffect(() => {

  //   }, [user]);
  const filteredNavItems = navItems.filter(item => {
    if (user || detail) {
      if(user){
        if (user.role === 'Admin') {
         
          // show all items for admin users
          return true;
        } else if (user.role === 'manager') {
          // show only specific items for manager users
          return ['Dashboard', 'Products', 'Geography', 'Sales'].includes(item.text);
        } else if (user.role === 'farmer') {
          // show only specific items for farmer users
          return ['Dashboard', 'Aquaculture Farms Section', 'Aquaculture Farms', 'Aquaculture Farmers'].includes(item.text);
        } else if (user.role === 'exporter') {
          return ['Dashboard', 'Aquaculture Farms Section', 'Aquaculture Farms', 'Aquaculture Farmers', 'Fisheries Section', 'Fishermens', 'Fish Processors', 'Section', 'Exporters', 'Aquaculture Farms Section Data', 'Farms Data', 'Farmers Data', 'Fisheries Data', 'Fishermens Data', 'Fish Processors Data', 'Sales', 'Overview', 'Daily', 'Monthly', 'Breakdown'].includes(item.text);
        } else {
          // show only specific items for other users
          return ['Dashboard', 'Products'].includes(item.text);
        }
      }else {
        if (detail.role === 'Admin') {
          
          // show all items for admin users
          return true;
        } else if (detail.role === 'manager') {
          // show only specific items for manager users
          return ['Dashboard', 'Products', 'Geography', 'Sales'].includes(item.text);
        } else if (detail.role === 'farmer') {
          // show only specific items for farmer users
          return ['Dashboard', 'Aquaculture Farms Section', 'Aquaculture Farms', 'Aquaculture Farmers'].includes(item.text);
        } else if (detail.role === 'exporter') {
          return ['Dashboard', 'Aquaculture Farms Section', 'Aquaculture Farms', 'Aquaculture Farmers', 'Fisheries Section', 'Fishermens', 'Fish Processors', 'Section', 'Exporters', 'Aquaculture Farms Section Data', 'Farms Data', 'Farmers Data', 'Fisheries Data', 'Fishermens Data', 'Fish Processors Data', 'Sales', 'Overview', 'Daily', 'Monthly', 'Breakdown'].includes(item.text);
        } else {
          // show only specific items for other users
          return ['Dashboard', 'Products'].includes(item.text);
        }
      }
      
    } else {
      return <div>Loading....</div>
    }



  });
  // useEffect(() => {
  //   filteredNavItems();
  // }, [user]);



  console.log('aluth data',detail)


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
              {

                filteredNavItems.map(({ text, icon }) => {
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
                  const lcTextNew = lcText.replace(/ /g, '');
                 

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
