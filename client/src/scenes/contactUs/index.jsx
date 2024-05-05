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
import { UserContext } from "../../UserContext";

const ContactUs = () => {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);
  const { user } = useContext(UserContext);

  const [selectedRole, setSelectedRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState(""); // New state for the message content
  const [openDialog, setOpenDialog] = useState(false); // State for controlling the message dialog
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectUserRole, setSelectUserRole] = useState(null);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState(null);
  const [msg, setMsg] = useState("");
  const status = "true";
  const [data, setData] = useState([]); // Initialize data state

  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [isSendButtonActive, setIsSendButtonActive] = useState(false);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios.get(`${baseUrl}/user/getContactUs`).then((response) => {
      setData(response.data.data);

      setIsLoading(false);
    });
  }, [data]);

  useEffect(() => {
    setIsSendButtonActive(!!message && !!email);
  }, [message, email]);

  const filterData =
    isLoading === "true"
      ? "Loading"
      : async () => {
          try {
            let filteredData = data;
            if (selectedRole) {
              filteredData = data.filter((user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
              );
            } else {
              filteredData = data.filter((user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
              );
            }
            setFilteredData(filteredData);
          } catch (error) {
            console.error("Error filtering data:", error);
          }
        };
  useEffect(() => {
    filterData();
  }, [data, selectedRole, searchQuery]);

  const handleSelectUser = (userId, role, email, comment) => {
    setSelectedUserId(userId);
    setSelectUserRole(role);

    setComment(comment);
    setEmail(email);
    setMsg("none");
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
      if (msg === "none") {
        await axios
          .put(`${baseUrl}/user/updateContactUs/${selectedUserId}/${status}`, {
            //-----------------
            //-------------------

            userId: selectedUserId,
            message: message,
            email: email,
            comment: comment
          })
          .then((response) => {
            if (response.data.success) {
              Swal.fire({
                title: "Successfull",
                text: "Reply Send successful!",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3644C5",
                confirmButtonText: "Ok!",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Message Not Sent",
                text: "Message Not Sent. Please Try Again Later.",
              });
            }
          });
      } else if (msg === "all") {
        await axios.put(
          `${baseUrl}/user/updateContactUs/${selectedUserId}/${status}`,
          {
            userId: "",
            message: message,
            email: email,
            comment: comment
          }
        );
      }

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
      flex: 1,
      hide: true,
    },
    {
      field: "name",
      headerName: "Username",
      flex: 0.4,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "contactNo",
      headerName: "Phone Number",
      flex: 0.4,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "comment",
      headerName: "Comment",
      flex: 1,
    },
    {
      field: "Message",
      headerName: "Message",
      flex: 0.3,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ fontWeight: "bold", backgroundColor: "#198754" }}
            onClick={() =>
              handleSelectUser(
                params.row._id,
                params.row.role,
                params.row.email
              )
            }
          >
            Reply
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CONTACT US" subtitle="List of Messages" />
      <Box style={{ marginTop: "5vh" }}>
        <TextField
          label="Search by name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ minWidth: 200 }}
        />
      </Box>
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
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={filteredData || []}
          columns={columns}
        />
      </Box>
      {/* Message Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Send Message</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your message below:</DialogContentText>

          <TextField
            margin="dense"
            label="Message "
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <TextField
            margin="dense"
            label="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(email)}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            style={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleMessageSubmit}
            color="primary"
            style={{
              fontWeight: isSendButtonActive ? "bold" : "normal",
              color: isSendButtonActive ? "white" : "black",
            }}
            disabled={!message || !email}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactUs;
