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
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Swal from "sweetalert2";



const RegisterUsers = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [profilepic, setProfilepic] = useState(null)
    const { pathname } = useLocation();
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("")
    const [town, setTown] = useState("");

    const [country, setCountry] = useState("");
    const [occupation, setOccupation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [province, setProvince] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const defaultTheme = createTheme();
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const handleImageChange = (e) => {
        setProfilepic(e.target.files[0]);
    };

    async function handleLoginSubmit(e) {
        e.preventDefault();
        const formData = new FormData();

        formData.append("username", userName);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("age", age);
        formData.append("gender", gender)
        formData.append("town", town);
        formData.append("country", country);
        formData.append("province", province);
        formData.append("address", address);
        formData.append("contactNo", phoneNumber);
        formData.append("role", role);
        formData.append("profilepic", profilepic);

        try {

            // const response = await axios.post("http://localhost:5001/general/add", formData);

            const response = await axios.post(`${baseUrl}/admin/createAqUser`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });


            if (response.status === 201) {
                console.log("User added successfully:", response.data);
                const addedUser = response.data;
                console.log("New user added:", addedUser);

                //-----------------
                const { isConfirmed } = await Swal.fire({
                    title: "Successfull",
                    text: "Registred Successful!",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3644C5",
                    confirmButtonText: "Ok!",
                });

                if (!isConfirmed) {
                    return;
                }
                try {
                    navigate('/dashboard');
                } catch (error) {
                    console.error("Error Registering ");
                }
                //---------------
                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Error',
                    text: 'Registration add failed. Please try again.',
                  });
                
            }
        } catch (error) {
            console.error("Error adding profile:", error);
            alert("An error occurred while adding the profile. Please try again later.");
        }
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

            <Grid container component="main" sx={{ height: '100vh', marginTop: '6vh' }}>
                <CssBaseline />

                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://th.bing.com/th/id/OIG.RIYh0SL1i2ks2DN_00Db?pid=ImgGn)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{ marginTop: "1rem", marginBottom: "5rem", color: "#1976D2", fontWeight: "bold" }}
                        >
                            REGISTER USER
                        </Typography>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <Person2OutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">

                        </Typography>
                        <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
                            <Typography >
                                User ID
                            </Typography>

                            <TextField
                                margin="normal"

                                name="username"
                                label="Userame"
                                fullWidth
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <TextField
                                margin="normal"

                                name="firstName"
                                label="First Name"
                                fullWidth
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                margin="normal"

                                name="lastName"
                                label="Last Name"
                                fullWidth
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <TextField
                                margin="normal"

                                name="email"
                                label="Email"
                                fullWidth
                                value={email}
                                inputProps={{ autoComplete: "off" }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
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
                                name="age"
                                label="Age"
                                fullWidth
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />

                            <FormControl fullWidth>
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                    labelId="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                    <MenuItem value={"Other"}>Other</MenuItem>

                                </Select>
                            </FormControl>
                            <TextField
                                margin="normal"
                                name="town"
                                label="City"
                                fullWidth
                                value={town}
                                onChange={(e) => setTown(e.target.value)}
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
                                name="province"
                                label="Province"
                                fullWidth
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                name="address"
                                label="Address"
                                fullWidth
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                name="contactNo"
                                label="Phone Number"
                                fullWidth
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />


                            <FormControl fullWidth>
                                <InputLabel id="role">Role</InputLabel>
                                <Select
                                    labelId="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <MenuItem value={"Admin"}>Admin</MenuItem>
                                    <MenuItem value={"Exporter"}>Exporter</MenuItem>
                                    <MenuItem value={"Farmer"}>Farmer</MenuItem>
                                    <MenuItem value={"Fishermen"}>Fishermen</MenuItem>
                                    <MenuItem value={"Chairman"}>Chairman</MenuItem>
                                    <MenuItem value={"Director General"}>Director General</MenuItem>
                                    <MenuItem value={"Assistant Director"}>Assistant Director</MenuItem>
                                    <MenuItem value={"District Aquaculturist"}>District Aquaculturist</MenuItem>
                                    <MenuItem value={"Minister"}>Minister</MenuItem>
                                    <MenuItem value={"Processor"}>Processor</MenuItem>


                                </Select>
                            </FormControl>

                            <TextField
                                margin="normal"
                                type="file"
                                label="Profile Image"
                                fullWidth
                                onChange={handleImageChange}
                            />

                            <Box sx={{ mt: 5 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ px: 5, marginRight: 1, fontWeight: "bold", height: '60px', width: '245px', border: '2px solid #3644C5', borderRadius: '28px', backgroundColor: 'white', color: '#3644C5' }}
                                >
                                    Register
                                </Button>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    sx={{ px: 5, marginLeft: 1, fontWeight: "bold", height: '60px', width: '245px', border: '2px solid #3644C5', borderRadius: '28px', backgroundColor: 'white', color: '#3644C5' }}
                                    onClick={back}
                                >

                                    Back
                                </Button>
                            </Box>
                        </Box>

                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>



        //------------------
    );
}
export default RegisterUsers;
