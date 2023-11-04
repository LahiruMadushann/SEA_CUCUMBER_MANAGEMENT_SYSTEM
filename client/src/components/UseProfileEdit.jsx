import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useGetAdminsQuery } from "state/api";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Profile from "./Profile";
import { useTheme } from "@mui/material";
import Cookies from 'js-cookie';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Swal from "sweetalert2";


const UserProfileEdit = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { user } = useContext(UserContext);
    const userId = useSelector((state) => state.global.userId);

    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pageLoaded, setPageLoaded] = useState(false);
    const baseUrl = process.env.REACT_APP_BASE_URL;

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

    const { pathname } = useLocation();
    const [userName, setUserName] = useState(detail ? detail.username : '');
    const [email, setEmail] = useState(detail ? detail.email : '');
    const [password, setPassword] = useState(detail ? detail.password : '');
    const [city, setCity] = useState(detail ? detail.town : '');
    const [country, setCountry] = useState(detail ? detail.country : '');
    const [occupation, setOccupation] = useState(detail ? 'role' : '');
    const [phoneNumber, setPhoneNumber] = useState(detail ? detail.contactNo : '');
    const [image, setImage] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(UserContext);


    const defaultTheme = createTheme();

    async function back(e) {
        e.preventDefault();
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to cancel the edit?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3644C5",
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No"
        });

        if (!isConfirmed) {
            return;
        }
        try {
            navigate('/userProfile');
        } catch (error) {
            console.error("Error Going Back");
        }

    }



  



    // useEffect((e) => {
    //      // Set the image state 
    //     console.log("Image state updated:", image);
    // }, [image]); 
    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];

        setImage(e.target.files[0]);


        if (!selectedImage) {
            return;
        }
        console.log("File selected:", selectedImage);
        setImage(selectedImage);

        try {

            // const updatedImage = {
            //     image: image,
            // };

            const formData = new FormData();
            formData.append('image', selectedImage);


            const response = await axios.put(`${baseUrl}/admin/updateProfilePic`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                console.log("Image successfully updated in the database.");
                // Profile update successful
                // alert("Profile Picture Updated Successfully!");

                const { isConfirmed } = await Swal.fire({
                    title: "Successfull",
                    text: "Profile Picture Updated Successfully!",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3644C5",
                    confirmButtonText: "Ok!",

                });

                if (!isConfirmed) {
                    return;
                }

                // Reload the page
                window.location.reload();
            } else {
                console.log("Failed to update image in the database.");
                alert("Profile Picture Update Failed. Please Try Again.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while uploading the profile picture. Please try again later.");
        }
    };

    async function handleLoginSubmit(e) {
        e.preventDefault();
        try {
            const updatedUserData = {
                username: userName,
                email: email,
                password: password,
                city: city,
                town: country,
                role: occupation,
                contactNo: phoneNumber,
            };

            Object.keys(updatedUserData).forEach((key) => {
                Cookies.set(key, updatedUserData[key]);
            });

            // Update the base URL to match your backend server
            const response = await axios.put(`${baseUrl}/general/user/${user._id}`, updatedUserData);

            if (response.status === 200) {
                // Profile update successful
                const { isConfirmed } = await Swal.fire({
                    title: "Successfull",
                    text: "Profile Detail Updated Successfully!",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3644C5",
                    confirmButtonText: "Ok!",

                });

                if (!isConfirmed) {
                    return;
                }

            } else {
                const { isConfirmed } = await Swal.fire({
                    title: "Fail",
                    text: "Profile update failed. Please try again.",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3644C5",
                    confirmButtonText: "Ok!",

                });

                if (!isConfirmed) {
                    return;
                }

            }
        } catch (error) {
            const { isConfirmed } = await Swal.fire({
                title: "Fail",
                text: "An error occurred while updating the profile. Please try again later.",
                icon: "error",
                showCancelButton: false,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3644C5",
                confirmButtonText: "Ok!",

            });

            if (!isConfirmed) {
                return;
            }
        }


    }




    // When user logs out or clears form data
    // Object.keys(formData).forEach(key => {
    //     Cookies.remove(key);
    // });

    return (

        <ThemeProvider theme={defaultTheme} >
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
            <Grid container component="main" sx={{ marginTop: '-86vh', position: 'relative', zIndex: 1, left: '-12vw' }}>
                <CssBaseline />
                <Grid
                // component={Paper}
                // item
                // xs={false}
                // sm={4}
                // md={7}
                // sx={{
                //     display: 'flex', // Display the Box and Grid contents as flex
                //     alignItems: 'center', // Align items vertically
                //     justifyContent: 'center', // Center items horizontally
                //     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                //     backgroundColor: theme.palette.secondary[600]
                // }}
                >
                    <Box
                    // sx={{
                    //     width: '100%',
                    //     height: '100%', // Set height to fill the container
                    //     display: 'flex', // Display the image container as flex
                    //     justifyContent: 'center', // Center items horizontally
                    //     alignItems: 'center', // Center items vertically
                    //     borderRadius: '50px', // Add border radius to the image container
                    //     overflow: 'hidden', // Hide any overflow content
                    // }}
                    >{user && user.username ? (

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
                    ) : pageLoaded ? (
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
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: -60, marginLeft: '5vw', fontWeight: "bold", height: '60px', width: '60px', border: '2px solid #fff', borderRadius: '100%', backgroundColor: '#909CFF', color: '#3644C5' }}
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            <CameraAltIcon sx={{ color: "#fff" }} />
                        </Button>



                    </Box>
                </Grid>

                <Grid item xs={12} sm={8} md={5} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,

                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{ marginTop: "-32rem", marginBottom: "5rem", color: "#fff", fontWeight: "bold", marginLeft: '-62vw' }}
                        >
                            User Profile Edit
                        </Typography>



                        <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: -2, marginRight: '-25vw', width: '36vw' }}>

                            {user && user.username ? (
                                <TextField
                                    margin="normal"

                                    name="name"
                                    label="Name"
                                    fullWidth
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />

                            ) : pageLoaded ? (
                                <TextField
                                    margin="normal"

                                    name="name"
                                    label="Name"
                                    fullWidth
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            ) : (
                                <div>Loading ....</div>
                            )}


                            {user && user.username ? (
                                <TextField
                                    margin="normal"

                                    name="email"
                                    label="Email"
                                    fullWidth
                                    value={email}
                                    inputProps={{ autoComplete: "off" }}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            ) : pageLoaded ? (
                                <TextField
                                    margin="normal"

                                    name="email"
                                    label="Email"
                                    fullWidth
                                    value={email}
                                    inputProps={{ autoComplete: "off" }}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            ) : (
                                <div>Loading ....</div>
                            )}
                            <TextField
                                margin="normal"

                                name="password"
                                label="Password"
                                fullWidth
                                type="password"
                                value={password}
                                inputProps={{ autoComplete: "off" }}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                name="city"
                                label="City"
                                fullWidth
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />


                            <TextField
                                margin="normal"
                                name="country"
                                label="Country"
                                fullWidth
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />


                            <TextField
                                margin="normal"
                                name="occupation"
                                label="Occupation"
                                fullWidth
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                name="phone"
                                label="Phone Number"
                                fullWidth
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />

                            {/* <TextField
                                margin="normal"
                                name="Role"
                                label="Role"
                                fullWidth
                                value={user.role}
                                onChange={(e) => setRo(e.target.value)}
                            /> */}


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1.5, marginLeft: '-62vw', px: 5, fontWeight: "bold", height: '60px', width: '200px', border: '2px solid #3644C5', borderRadius: '28px', backgroundColor: 'white', color: '#3644C5' }}
                            >
                                UPDATE DETAIL
                            </Button>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1.5, marginLeft: '-28vw', px: 5, fontWeight: "bold", height: '60px', width: '200px', border: '2px solid #E71010', borderRadius: '28px', backgroundColor: 'white', color: '#E71010' }}
                                onClick={back}
                            >
                                Cancel
                            </Button>

                        </Box>

                    </Box>
                </Grid>
            </Grid>
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />
        </ThemeProvider>



        //------------------
    );
}
export default UserProfileEdit;
