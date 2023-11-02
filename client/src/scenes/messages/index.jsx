import React, { useState,useEffect } from "react";
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

const Message = () => {
  const theme = useTheme();

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
  
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {

  
    axios.get(`${baseUrl}/user/getAllUsers`).then(response => {

      // setDetail(response.data);
      setData(response.data.data)
     // Set loading to false when the response is received
      setIsLoading(false);
      
 
    });

  }, []);


  // React.useEffect(() => {
  //   if (allData) {
  //     setData(allData);
  //   }
  // }, [allData]);

  const filterData = isLoading === "true" ? "Loading" : async () => {
    try {
      let filteredData = data;
      if (selectedRole) {
        filteredData = data.filter(
          (user) =>
            user.role === selectedRole &&
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        filteredData = data.filter((user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
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

 

  const roleMessage = () => {
    setMsg("all");
    setSelectedRole(selectedRole);
    handleOpenDialog();
  }

  const handleSelectUser = (userId,role) => {
    setSelectedUserId(userId);
    setSelectUserRole(role);
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
    // Save the message to the database

    try {
      
      if (msg === "none") {
        const response = await axios.post("http://localhost:5001/general/messages", {
          userId: selectedUserId,
          role: selectUserRole,
          message: message,
        });
        console.log("Message saved:", response.data);
      } else if (msg === "all") {
        const response = await axios.post("http://localhost:5001/general/messages", {
          userId: "", // Leave userId empty to indicate sending to all users
          role: selectedRole, // Include the selectedRole for all users
          message: message,
        });
        console.log("Message saved:", response.data);
      }
  
      // Close the message dialog
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleUpdateRow = (rowId) => {
    // You can navigate to the update user page or open a modal here
    // For example:
    // history.push(`/update-user/${rowId}`);
    // or
    // setEditingUserId(rowId); // To manage the state of the user being edited
  };

  

  const refetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/client/customers");
      setData(response.data); // Update the data state with the new data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "contactNo",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    // {
    //   field: "occupation",
    //   headerName: "Occupation",
    //   flex: 1,
    // },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },


    ,
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
            onClick={() => handleSelectUser(params.row._id,params.row.role)}
            
          >
            Message
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">

      <Header title="SEND MESSAGES" subtitle="List of Users" />
      <Box style={{ marginTop: "5vh" }}>
        <FormControl variant="outlined" sx={{ minWidth: 200, marginRight: '2vw' }}>
          <InputLabel>Select User Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            label="Select User Role"
          >
            <MenuItem value=""><em>All Roles</em></MenuItem>
            <MenuItem value="Minister">Minister</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Director General">Director General</MenuItem>
            <MenuItem value="Assistant Director">Assistant Director</MenuItem>
            <MenuItem value="District Aquaculturist">District Aquaculturist</MenuItem>
            <MenuItem value="Farmer">Farmer</MenuItem>
            <MenuItem value="Fisherman">Fisherman</MenuItem>
            <MenuItem value="Exporter">Exporter</MenuItem>
            <MenuItem value="Processor">Processor</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search by name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ minWidth: 200 }}
        />
        <Button
            variant="outlined"
            color="secondary"
            sx={{ fontWeight: "bold", backgroundColor: "#198754",minWidth: 200, marginLeft: '2vw',height: '3.4vw'  }}
            onClick={() => roleMessage()}
          >
            Send Message
          </Button>
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
            autoFocus
            margin="dense"
            label="Message"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleMessageSubmit} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Message;
