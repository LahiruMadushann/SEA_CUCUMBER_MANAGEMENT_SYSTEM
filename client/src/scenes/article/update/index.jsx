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
import { useGetAllUsersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { UserContext } from "../../../UserContext";

const UpdateArticle = () => {
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


    const [detail, setDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [messageTitle, setMessageTitle] = useState(""); // New state for the message title
    const [messageDescription, setMessageDescription] = useState(""); // New state for the message description
    const [messageType, setMessageType] = useState(""); // New state for the message type
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


        axios.get(`${baseUrl}/user/getAllArticlesData`).then(response => {

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
                setCategory(user.category)
                setHeading(user.heading)
                setContent(user.content)
                setLink(user.link)
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

            const response = await axios.post(`${baseUrl}/user/getAllArticlesData`, {
                userId: selectedUserId,
                category: category,
                heading: heading,
                content: content, 
                link: link, 

            });
            console.log("Message saved:", response.data);


            // Close the message dialog
            handleCloseDialog();
        } catch (error) {
            console.error("Error saving message:", error);
        }
    };


    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 0.6,
        },
        {
            field: "category",
            headerName: "Category",
            flex: 0.5,
        },
        {
            field: "heading",
            headerName: "Heading",
            flex: 1,
        },

        {
            field: "content",
            headerName: "Content",
            flex: 0.4,
        },
        // {
        //   field: "occupation",
        //   headerName: "Occupation",
        //   flex: 1,
        // },
        {
            field: "link",
            headerName: "Link",
            flex: 0.5,
        },

        {
            field: "Message",
            headerName: "Message",
            flex: 0.5,
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
                        label="Category"
                        fullWidth
                        
                        variant="outlined"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Heading"
                        fullWidth
                        variant="outlined"
                        value={link}
                        onChange={(e) => setHeading(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Content"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}

                    />
                    <TextField
                        margin="dense"
                        label="Link"
                        fullWidth
                        variant="outlined"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}

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
                            fontWeight: isSendButtonActive ? 'bold' : 'normal',
                            color: isSendButtonActive ? 'white' : 'black',
                        }}
                        disabled={
                            !category || !heading || !content || !link 
                        }
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UpdateArticle;
