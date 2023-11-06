import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    Button,
    useTheme,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { UserContext } from "../../../UserContext";

const UpdateKnowledgeCenter = () => {
    const theme = useTheme();
    const userId = useSelector((state) => state.global.userId);
    const { user } = useContext(UserContext);

    const [selectedRole, setSelectedRole] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [message, setMessage] = useState(""); // New state for the message content
    const [openDialog, setOpenDialog] = useState(false); // State for controlling the message dialog
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectUserRole, setSelectUserRole] = useState(null);
    const [msg, setMsg] = useState("");
    const [data, setData] = useState([]); // Initialize data state

    const [speciesType, setSpeciesType] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [description, setDescription] = useState("");
    const [habitats, setHabitats] = useState("");
    const [feeding, setFeeding] = useState("");
    const [reproduction, setReproduction] = useState("");
    const [lifecycle, setLifecycle] = useState("");
    const [fishingMethods, setFishingMethods] = useState("");
    const [seaCucumberImages, setSeaCucumberImages] = useState("");




    const [detail, setDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [postedBy, setPostedBy] = useState(""); // New state for the user posting the message
    const [postedTo, setPostedTo] = useState(""); // New state for the user receiving the message
    const [isSendButtonActive, setIsSendButtonActive] = useState(false);
    const [category, setCategory] = useState("");
    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");
    const [link, setLink] = useState("")


    const baseUrl = process.env.REACT_APP_BASE_URL;

    //Get App user Role

    useEffect(() => {


        axios.get(`${baseUrl}/user/getAllSpeciesData`).then(response => {

            // setDetail(response.data);
            setData(response.data.data)
            // Set loading to false when the response is received
            // setPostedBy(data)


            setIsLoading(false);


            const getUserIdRole = (userId) => {
                const user = data.find((user) => user._id === userId);
                if (user) {
                    return user.role;
                }
                return null; // User not found
            };
            const userRole = getUserIdRole(userId);

            setPostedBy(userRole)

        });

    }, [data]);


    useEffect(() => {
        setIsSendButtonActive(
            !!category && !!heading && !!content && !!link
        );
    }, [category, heading, content, link]);


    const handleSelectUser = (userId, role) => {
        setSelectedUserId(userId);
        data.find((user) => {
            if (user._id === userId) {
                setSpeciesType(user.speciesType)
                setScientificName(user.scientificName)
                setDescription(user.description)
                setHabitats(user.habitats);
                setFeeding(user.feeding)
                setReproduction(user.reproduction)
                setLifecycle(user.lifecycle)
                setFishingMethods(user.fishingMethods)
                setSeaCucumberImages(user.seaCucumberImages)

            }

        })

        handleOpenDialog();
    };

    const handleOpenDialog = () => {

        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleMessageSubmit = async () => {
        try {

            await axios.put(`${baseUrl}/admin/updateSpeciesDetails`, {
                speciesId: selectedUserId,
                speciesType: speciesType,
                scientificName: scientificName,
                description: description,
                habitats: habitats,
                feeding: feeding,
                reproduction: reproduction,
                lifecycle: lifecycle,
                fishingMethods: fishingMethods,
                seaCucumberImages: seaCucumberImages

            }).then((response) => {

                if (response.data.success) {
                    Swal.fire({
                        title: "Successfull",
                        text: "Article Update Successfull!",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3644C5",
                        confirmButtonText: "Ok!",

                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Fail',
                        text: 'Article Update Fail. Please Try Again Later.',
                    });
                }
            });;



            // Close the message dialog
            handleCloseDialog();
        } catch (error) {
            console.error("Error saving message:", error);
        }
    };
    //delete article
    const handleDeleteRow = async (rowId) => {
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete this article?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3644C5",
            confirmButtonText: "Yes, delete it!",
        });

        if (!isConfirmed) {
            return;
        }

        try {

            console.log(`Deleted row with ID: ${rowId}`);

            await axios.delete(`${baseUrl}/admin/deleteArticleDetails/${rowId}`);

            // Refresh the data after deletion (optional)
            // refetchData();

        } catch (error) {
            console.error("Error deleting row:", error);
        }

    };
    //   const refetchData = async () => {
    //     try {
    //       const response = await axios.get(`${baseUrl}/user/getAllUsers`);
    //       setDetail(response.data);
    //       setDataNew(detail.data) // Update the data state with the new data
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   };

    const columns = [
        // {
        //     field: "_id",
        //     headerName: "ID",
        //     flex: 0.6,
        // },
        {
            field: "speciesType",
            headerName: "Species Type",
            flex: 0.5,
        },
        {
            field: "scientificName",
            headerName: "Scientific Name",
            flex: 0.5,
        },

        {
            field: "description",
            headerName: "Description",
            flex: 0.4,
        },
        // {
        //   field: "occupation",
        //   headerName: "Occupation",
        //   flex: 1,
        // },
        {
            field: "habitats",
            headerName: "Habitats",
            flex: 0.5,
        },
        {
            field: "fishingMethods",
            headerName: "Fishing Methods",
            flex: 0.5,
        },

        {
            field: "Message",
            headerName: "Update",
            flex: 0.3,
            renderCell: (params) => (
                <div>

                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ fontWeight: "bold", backgroundColor: "#198754" }}
                        onClick={() => handleSelectUser(params.row._id, params.row.role)}

                    >
                        Update
                    </Button>
                </div>
            ),
        },
        {
            field: "actions",
            headerName: "Delete",
            flex: 0.3,
            renderCell: (params) => (

                // <Button
                //   variant="outlined"
                //   color="primary"
                //   onClick={() => handleUpdateRow(params.row._id)}
                // >
                //   Update
                // </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ fontWeight: "bold", backgroundColor: "#ff0e0e" }}
                    onClick={() => handleDeleteRow(params.row._id)}
                >
                    Delete
                </Button>

            ),
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">

            <Header title="ARTICLE" subtitle="List of Articles" />

            <Box
                mt="40px"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                    marginTop: "5vh"
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={data || []}
                    columns={columns}
                />

            </Box>
            {/* Message Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Update Article</DialogTitle>
                <DialogContent>
                    <DialogContentText>Update Your Article Below:</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Id"
                        fullWidth
                        variant="outlined"
                        value={userId}
                        InputProps={{
                            readOnly: true, // non-editable
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Species Type"
                        fullWidth

                        variant="outlined"
                        value={speciesType}
                        onChange={(e) => setSpeciesType(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Scientific Name"
                        fullWidth
                        variant="outlined"
                        value={scientificName}
                        onChange={(e) => setScientificName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}

                    />
                    <TextField
                        margin="dense"
                        label="Habitats"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={habitats}
                        onChange={(e) => setHabitats(e.target.value)}

                    />
                    <TextField
                        margin="dense"
                        label="Feeding"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={feeding}
                        onChange={(e) => setFeeding(e.target.value)}

                    />
                    <TextField
                        margin="dense"
                        label="Reproduction"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={reproduction}
                        onChange={(e) => setReproduction(e.target.value)}

                    />
                    <TextField
                        margin="dense"
                        label="Lifecycle"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={lifecycle}
                        onChange={(e) => setLifecycle(e.target.value)}

                    />
                    <TextField
                        margin="dense"
                        label="Fishing Methods"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={fishingMethods}
                        onChange={(e) => setFishingMethods(e.target.value)}

                    />
                    {/* <TextField
                        margin="dense"
                        label="Sea Cucumber Images"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={seaCucumberImages}
                        onChange={(e) => setSeaCucumberImages(e.target.value)}

                    /> */}

                    <TextField
                        margin="dense"
                        label="Sea Cucumber Images"
                        fullWidth
                        InputProps={{
                            inputComponent: 'input',
                            inputProps: {
                                accept: 'image/*',  // Accept only image files
                                type: 'file',  // Type of input is file
                                onChange: (event) => {
                                    const file = event.target.files[0];
                                    setSeaCucumberImages(URL.createObjectURL(file));  // Update the image state variable
                                    // Now you can use the file object for further processing
                                },
                            },
                        }}  
                        
                    />

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        color="primary"
                        style={{
                            fontWeight: 'bold',
                            color: 'white',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleMessageSubmit}
                        color="primary"
                        style={{
                            fontWeight:  'bold',
                            color: 'white' ,
                        }}
                        // disabled={
                        //     !category || !heading || !content || !link
                        // }
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UpdateKnowledgeCenter;
