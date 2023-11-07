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

const UpdateFAQ = () => {
    const theme = useTheme();
    const userId = useSelector((state) => state.global.userId);
    const [openDialog, setOpenDialog] = useState(false); // State for controlling the message dialog
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [data, setData] = useState([]); // Initialize data state
    const [detail, setDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSendButtonActive, setIsSendButtonActive] = useState(false);
    
const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("")

    const baseUrl = process.env.REACT_APP_BASE_URL;

    //Get App user Role

    useEffect(() => {


        axios.get(`${baseUrl}/user/getAllFAQDetails`).then(response => {

            // setDetail(response.data);
            setData(response.data.data)
            // Set loading to false when the response is received
            // setPostedBy(data)
           

            setIsLoading(false);


        });

    }, [data]);


    useEffect(() => {
        setIsSendButtonActive(
            !!answer && !!question 
        );
    }, [answer, question]);


    const handleSelectUser = (userId, role) => {
        setSelectedUserId(userId);
        data.find((user) => {
            if (user._id === userId) {
                setQuestion(user.question);
                setAnswer(user.answer);
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

            await axios.put(`${baseUrl}/admin/updateFaqdetails`, {
                userId: selectedUserId,
                question: question,
                answer: answer
                
            }).then((response)=>{ 
        
                if (response.data.success){
                  Swal.fire({
                    title: "Successfull",
                    text: "FAQ Update Successfull!",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3644C5",
                    confirmButtonText: "Ok!",
                    
                  });
                }else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Fail',
                    text: 'FAQ Update Fail. Please Try Again Later.',
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
      text: "Are you sure you want to delete this FAQ?",
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

        await axios.delete(`${baseUrl}/admin/deleteFaqdetails/${rowId}`);

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
            field: "question",
            headerName: "Question",
            flex: 0.7,
        },
        {
            field: "answer",
            headerName: "Answer",
            flex: 1,
        },

        

        {
            field: "FAQ",
            headerName: "Update FAQ",
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
            headerName: "Delete FAQ",
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
                sx={{fontWeight:"bold",backgroundColor:"#ff0e0e"}}
                onClick={() => handleDeleteRow(params.row._id)}
              >
                Delete
              </Button>
      
            ),
          },
    ];

    return (
        <Box m="1.5rem 2.5rem">

            <Header title="FAQ" subtitle="List of FAQ" />

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
                <DialogTitle>Update FAQ</DialogTitle>
                <DialogContent>
                    <DialogContentText>Update Your FAQ Below:</DialogContentText>
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
                        label="Question"
                        fullWidth
                        
                        variant="outlined"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Answer"
                        fullWidth
                        variant="outlined"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
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
                            !answer || !question 
                        }
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UpdateFAQ;
