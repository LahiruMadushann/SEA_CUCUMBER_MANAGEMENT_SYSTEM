import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAdminsQuery } from "state/api";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { jwtDecode } from 'jwt-decode';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from "react-router";
import { setUserId } from "../../src/state/index";
import Swal from "sweetalert2";

const Login = ({ user }) => {
  const navigate = useNavigate();

  console.log(user.username)

  const { userId } = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserContext);
  const defaultTheme = createTheme();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  async function handleLoginSubmit(e) {
    e.preventDefault();
  const backendUrl = `${baseUrl}/login`;
  const userData = {
    username: name,
    password: password,
  };
  axios
    .post(backendUrl, userData)
    .then((response) => {
      if (response.data.success) {
        const token = response.data.token;
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id; // Assuming the user ID is stored as "_id" in the token
     
        console.log("User ID:", userId);

        // Set the token and user ID in the Redux state
        dispatch({ type: "SET_TOKEN", payload: token });
        dispatch(setUserId(userId));
        setUser({ ...user, ...decodedToken });

        const { isConfirmed } =  Swal.fire({
          title: "Successfull",
          text: "Login successful!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3644C5",
          confirmButtonText: "Ok!",
          
        });

        if(decodedToken.role === "Fisherman"){
          navigate('/fisheriessectiondashboard');
        }else if(decodedToken.role === "Farmer"){
          navigate('/farmingsectiondashboard');

        }else{
          navigate('/fisheriessectiondashboard');
        }
    
   
      } else {
        // Show an alert for unsuccessful login
        Swal.fire({
          icon: 'error',
          title: 'Login Error',
          text: 'Unsuccessful login. Please check your credentials.',
        });
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'Unsuccessful login. Please check your credentials.',
      });
    });


  }

  return (

    <ThemeProvider theme={defaultTheme} >
      <Grid container component="main" sx={{ height: '95vh', marginTop: '6vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://th.bing.com/th/id/OIGP.GVeSzJPF6h6X2UueFH9Z?pid=ImgGn)',
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
              SEACUCUMBER ADMIN
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="password"
                autoFocus
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
              >
                Sign In
              </Button>


            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>



    //------------------
  );
}
export default Login;