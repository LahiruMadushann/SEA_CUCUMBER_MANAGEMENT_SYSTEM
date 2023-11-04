import axios from "axios";
import React from "react";
import { useGetAdminsQuery } from "state/api";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useTheme } from "@mui/material";
import Swal from "sweetalert2";


import Profile from "./Profile";

const UserProfile = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const userId = useSelector((state) => state.global.userId);

    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state
    // const [user, setUser] = useState(null); // Use state to manage user data
    const baseUrl = process.env.REACT_APP_BASE_URL;
   
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
        console.log("sucesss")
  
        // setUser(detail);
  
        console.log("Response ek  Navbar pgo", response.data)
      });
  
    }, [userId]);

    // console.log("Profile pic new",user)


    
    const { pathname } = useLocation();
    const [userName, setUserName] = useState(detail ? detail.username : '');
    const [email, setEmail] = useState(detail ? detail.email : '');
    const [password, setPassword] = useState(detail ? detail.password : '');
    const [city, setCity] = useState(detail ? detail.town : '');
    const [country, setCountry] = useState(detail ? detail.country : '');
    const [occupation, setOccupation] = useState(detail ? detail.occupation : '');
    const [phoneNumber, setPhoneNumber] = useState(detail ? detail.contactNo : '');
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(UserContext);
    const theme = useTheme();

    const defaultTheme = createTheme();
    async function handleLoginSubmit(e) {
        e.preventDefault();

        navigate('/userProfileEdit');


    }

    async function back(e) {
        e.preventDefault();
        
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "Are you want go back to the dashboard?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3644C5",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
          });
      
          if (!isConfirmed) {
            return;
          }
            try {
                navigate('/dashboard');
            } catch (error) {
              console.error("Error Going Back");
            }
          
    }


    return (
        
            <ThemeProvider theme={defaultTheme} >
                {/* <Paper elevation={3} sx={{ margin: "2rem", padding: "2rem" }}> */}
                <Box
                    sx={{
                        width: '1642.4580168846821px',
                        height: '1208.7139954549539px',
                        zIndex: 0,
                        top: '-890.66748046875px',
                        left: '-806px',
                        borderRadius: '50px',
                        transform: 'rotate(48.24deg)',
                        backgroundColor: '#909CFF',
                        position: 'relative',
                    }}
                />




                <Box component="form" noValidate onSubmit={handleLoginSubmit}>
                    <Grid container component="main" sx={{ marginTop: '-86vh', position: 'relative', zIndex: 1, left: '-12vw' }}>
                        <CssBaseline />
                        <Grid
                        // component={Paper}
                        // item
                        // xs={false}
                        // sm={4}
                        // md={7}
                        // sx={{
                        //     display: 'flex',
                        //     alignItems: 'center',
                        //     justifyContent: 'center',
                        //     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                        //     // backgroundColor: theme.palette.secondary[600]
                        // }}
                        >
                            <Box>
                            {user && user.username ? (
                                    
                                    <img
                                    
                                        src={require(`../../../backend/Images/profilePics/${user.profilepic}`)} // Use user's imagePath if available
                                        alt="Profile"
                                        style={{
                                            marginLeft: '11vw',
                                            width: '438px',
                                            marginTop: '-22vh',
                                            height: '438px',
                                            objectFit: 'cover',
                                            borderRadius: '100%',
                                            top: '-23vh',
                                            left: '177px',
                                            position: 'relative'

                                        }}
                                    />
                                    ) : pageLoaded ?  ( 
                                        <img
                                    
                                        src={require(`../../../backend/Images/profilePics/${detail.profilepic}`)} // Use user's imagePath if available
                                        alt="Profile"
                                        style={{
                                            marginLeft: '11vw',
                                            width: '438px',
                                            marginTop: '-22vh',
                                            height: '438px',
                                            objectFit: 'cover',
                                            borderRadius: '100%',
                                            top: '-23vh',
                                            left: '177px',
                                            position: 'relative'

                                        }}
                                    />
                                    ) : (
                                        <div>Loading...</div>
                                    )}

                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={8} md={5} elevation={6} square>
                            <Box
                                sx={{
                                    my: -68,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    sx={{ marginTop: "5rem", marginBottom: "5rem", color: "#fff", fontWeight: "bold", marginLeft: '-45vw' }}
                                >
                                    User Profile
                                </Typography>

                                <Box sx={{ mt: -2, marginLeft: '30vw' }}>

                                {user && user.username ? (

                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>User ID </Typography>
                                                </TableCell>
                                                <TableCell>{user._id}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>User Name </Typography>
                                                </TableCell>
                                                <TableCell>{user.username}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>Email </Typography>
                                                </TableCell>
                                                <TableCell>{user.email}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>City </Typography>
                                                </TableCell>
                                                <TableCell>{user.town}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>Country </Typography>
                                                </TableCell>
                                                <TableCell>{user.country}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>Role </Typography>
                                                </TableCell>
                                                <TableCell>{user.role}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>Phone Number </Typography>
                                                </TableCell>
                                                <TableCell>{user.contactNo}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    ) : pageLoaded ?  ( 
                                        <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>User ID </Typography>
                                                </TableCell>
                                                <TableCell>{detail._id}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>User Name </Typography>
                                                </TableCell>
                                                <TableCell>{detail.username}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>Email </Typography>
                                                </TableCell>
                                                <TableCell>{detail.email}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>City </Typography>
                                                </TableCell>
                                                <TableCell>{detail.town}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>Country </Typography>
                                                </TableCell>
                                                <TableCell>{detail.country}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>Role </Typography>
                                                </TableCell>
                                                <TableCell>{detail.role}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography sx={{ fontWeight: "bold" }}>Phone Number </Typography>
                                                </TableCell>
                                                <TableCell>{detail.contactNo}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    ): (
                                        <div>Loading...</div>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: -20, marginLeft: '65vw', px: 5, fontWeight: "bold", height: '60px', width: '165px', border: '2px solid #3644C5', borderRadius: '28px', backgroundColor: 'white', color: '#3644C5' }}
                        >

                            EDIT USER
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: -20, marginLeft: '78vw', px: 5, fontWeight: "bold", height: '60px', width: '160px', border: '2px solid #3644C5', borderRadius: '28px', backgroundColor: 'white', color: '#3644C5' }}
                            onClick={back}
                        >

                            Back
                        </Button>
                    </Grid>

                </Box>
                {/* </Paper> */}
            </ThemeProvider>
        


        //------------------
    );
}
export default UserProfile;
