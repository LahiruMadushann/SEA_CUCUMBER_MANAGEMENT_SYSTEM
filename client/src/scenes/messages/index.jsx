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

const Message = () => {
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


  const baseUrl = process.env.REACT_APP_BASE_URL;

  //Get App user Role

  useEffect(() => {


    axios.get(`${baseUrl}/user/getAllUsers`).then(response => {

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


  // React.useEffect(() => {
  //   if (allData) {
  //     setData(allData);
  //   }
  // }, [allData]);
  useEffect(() => {
    setIsSendButtonActive(
      !!messageTitle && !!messageDescription && !!messageType && !!postedBy && !!postedTo
    );
  }, [messageTitle, messageDescription, messageType, postedBy, postedTo]);



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

  const handleSelectUser = (userId, role) => {
    setSelectedUserId(userId);
    setSelectUserRole(role);
    setPostedTo(role);
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
        const response = await axios.post("http://localhost:5000/admin/enterNews", {
          userId: selectedUserId,
          role: selectUserRole,
          message: message,
          title: messageTitle, // Add title to the request
          description: messageDescription, // Add description to the request
          type: messageType, // Add type to the request
          postedBy: postedBy, // Add postedBy to the request
          postedTo: postedTo, // Add postedTo to the request
        });
        console.log("Message saved:", response.data);
      } else if (msg === "all") {
        const response = await axios.post("http://localhost:5000/admin/enterNews", {
          userId: "", // Leave userId empty to indicate sending to all users
          role: selectedRole, // Include the selectedRole for all users
          message: message,
          title: messageTitle, // Add title to the request
          description: messageDescription, // Add description to the request
          type: messageType, // Add type to the request
          postedBy: postedBy, // Add postedBy to the request
          postedTo: postedTo, // Add postedTo to the request
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
      const response = await axios.get("http://localhost:5000/client/customers");
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
            onClick={() => handleSelectUser(params.row._id, params.row.role)}

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
          sx={{ fontWeight: "bold", backgroundColor: "#198754", minWidth: 200, marginLeft: '2vw', height: '3.4vw' }}
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
            label="Message Title"
            fullWidth
            variant="outlined"
            value={messageTitle}
            onChange={(e) => setMessageTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Message Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={messageDescription}
            onChange={(e) => setMessageDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Message Type"
            fullWidth
            variant="outlined"
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Posted By"
            fullWidth
            variant="outlined"
            value={postedBy}
            onChange={(e) => setPostedBy(e.target.value)}
            InputProps={{
              readOnly: true, // non-editable
            }}
          />
          <TextField
            margin="dense"
            label="Posted To"
            fullWidth
            variant="outlined"
            value={postedTo}
            onChange={(e) => setPostedTo(e.target.value)}
            InputProps={{
              readOnly: true, // non-editable
            }}
          />

        </DialogContent>
        <DialogActions>
          <Button 
          onClick={handleCloseDialog} 
          color="primary"
          style={{
            fontWeight: 'bold',
            color: 'white' ,
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
              !messageTitle || !messageDescription || !messageType || !postedBy || !postedTo
            }
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Message;
