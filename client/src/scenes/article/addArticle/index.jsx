import axios from "axios";
import React from "react";
import {useState } from "react";

import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from "sweetalert2";


const AddArticle = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");
    const [link, setLink] = useState("");

    const defaultTheme = createTheme();
    const baseUrl = process.env.REACT_APP_BASE_URL;


    async function back(e) {
        e.preventDefault();
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to go back?",
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

    async function handleLoginSubmit(e) {
        e.preventDefault();
       
        try {


            const response = await axios.post(`${baseUrl}/admin/enterArticleDetails`,  {
                category: category,
                heading: heading,
                content: content, 
                link: link, 
            });


            if (response.status === 200) {

                //--------------------------
                const { isConfirmed } = await Swal.fire({
                    title: "Success?",
                    text: "Article Added Successfuly",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#d33",
                    // cancelButtonColor: "#3644C5",
                    confirmButtonText: "Ok!",
                    // cancelButtonText: "No"
                });

                if (!isConfirmed) {
                    return;
                }
                try {
                    navigate("/addarticle");
                } catch (error) {
                    console.error("Error Going Back");
                }
                //--------------------------

                setCategory("");
                setHeading("");
                setContent("");
                setLink("");


                navigate("/addarticle");
            } else {
                alert("Article adding failed. Please try again.");
            }
        } catch (error) {
            console.error("Error adding Article:", error);
            alert("An error occurred while adding the Article. Please try again later.");
        }



    }


    return (


        //-----------------

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

                >
                    <Box

                    >
                        <img
                            src={require(`assets/article.png`)}
                            alt="Profile"
                            style={{
                                marginLeft: '11vw',
                                width: '35vw',
                                marginTop: '-22vh',
                                height: '35vw',
                                objectFit: 'cover',
                                borderRadius: '100%',
                                top: '-23vh',
                                left: '177px',
                                position: 'relative'

                            }}
                        />

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
                            variant="h3"
                            sx={{ marginTop: "-32rem", marginBottom: "5rem", color: "#3644C5", fontWeight: "bold", marginLeft: 'auto', marginRight: 'auto' }}
                        >
                            Add Article
                        </Typography>



                        <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: -2, marginRight: '-25vw', width: '36vw' }}>

                            <TextField
                                margin="normal"

                                name="category"
                                label="Category"
                                fullWidth
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                name="heading"
                                label="Heading"
                                fullWidth
                                value={heading}
                                inputProps={{ autoComplete: "off" }}
                                onChange={(e) => setHeading(e.target.value)}
                            />
                            
                            <TextField
                                margin="normal"

                                name="content"
                                label="Content"
                                fullWidth
                                multiline
                                rows={12}
                                value={content}
                                inputProps={{ autoComplete: "off" }}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                name="link"
                                label="Link"
                                fullWidth
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 18.5, marginLeft: '-18vw', px: 5, fontWeight: "bold", height: '60px', width: '200px', border: '2px solid #3644C5', borderRadius: '28px', backgroundColor: 'white', color: '#3644C5' }}
                                >
                                    Add Data
                                </Button>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 18.5, marginLeft: '-28vw', px: 5, fontWeight: "bold", height: '60px', width: '200px', border: '2px solid #E71010', borderRadius: '28px', backgroundColor: 'white', color: '#E71010' }}
                                    onClick={back}
                                >
                                    Go Back
                                </Button>
                           
                        </Box>

                    </Box>
                </Grid>
            </Grid>

        </ThemeProvider>

        //-----------------



        //------------------
    );
}
export default AddArticle;
