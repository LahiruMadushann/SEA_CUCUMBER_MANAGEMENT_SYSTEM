import React, { useState,useEffect } from "react";
import { Box, Button, useTheme, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { useGetAllUsersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Swal from "sweetalert2"; 

const ActivateUsers = () => {
  const theme = useTheme();
  const [data, setData] = useState([]); // Initialize data state
  const [selectedRole, setSelectedRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
  // const filterData = async () => {
  //   try {
  //     let filteredData = data;
  //     if (selectedRole) {
  //       filteredData = data.filter(
  //         (user) =>
  //           user.role === selectedRole &&
  //           user.username.toLowerCase().includes(searchQuery.toLowerCase())
  //       );
  //     } else {
  //       filteredData = data.filter((user) =>
  //         user.username.toLowerCase().includes(searchQuery.toLowerCase())
  //       );
  //     }
  //     setFilteredData(filteredData);
  //   } catch (error) {
  //     console.error("Error filtering data:", error);
  //   }
  // };

   // Call filterData whenever dataNew, selectedRole, or searchQuery changes
   useEffect(() => {
    filterData();
  }, [data, selectedRole, searchQuery]);


    const handleStatusChange = async (rowId, action) => {
        const confirmationText = action === "Active" ? "Active" : "Inactive";
        const { isConfirmed } = await Swal.fire({
          title: `Are you sure?`,
          text: `Are you sure you want to ${confirmationText} this user?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3644C5",
          confirmButtonText: `Yes, ${confirmationText.toLowerCase()} it!`,
        });
      
        if (!isConfirmed) {
          return;
        }
      
        try {
          // Make an API call to update the user's status
          console.log(`${confirmationText}ing user with ID:`, rowId);
          await axios.put(`${baseUrl}/admin/updateUser/${rowId}/${confirmationText}`);
          
          // Refresh the data after update (optional)
          refetchData();
      
          console.log(`${confirmationText}d user with ID: ${rowId}`);
        } catch (error) {
          console.error(`Error ${confirmationText.toLowerCase()}ing user:`, error);
        }
      };
      

  const refetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/getAllUsers`);
      setData(response.data.data)
      // setData(detail.data) // Update the data state with the new data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const columns = [
    {
      field: "nicNo",
      headerName: "NIC No",
      flex: 0.5,
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
    // {
    //   field: "phoneNumber",
    //   headerName: "Phone Number",
    //   flex: 0.5,
    //   renderCell: (params) => {
    //     return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    //   },
    // },
    {
      field: "accountStatus",          //gg
      headerName: "State",
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
    // {
    //   field: "update",
    //   headerName: "Update Farmer",
    //   flex: 0.5,
    //   renderCell: (params) => (

    //   <Button
    //     variant="outlined"
    //     color="primary"
    //     onClick={() => handleUpdateRow(params.row._id)}
    //   >
    //     Update
    //   </Button>


    //   ),
    // },
    {
      field: "activate",
      
      headerName: "Activate Users",
      flex: 0.5,
      renderCell: (params) => (

        <Button
          variant="outlined"
          color="secondary"
          sx={{fontWeight:"bold",backgroundColor:"#198754"}}
          onClick={() => handleStatusChange(params.row._id, "Active")}
        >
          Activate
        </Button>

      ),
    },
    {
        field: "deactivate",
        headerName: "Deactivate Users",
        flex: 0.5,
        renderCell: (params) => (
  
          <Button
            variant="outlined"
            color="secondary"
            sx={{fontWeight:"bold",backgroundColor:"#ff0e0e"}}
            onClick={() => handleStatusChange(params.row._id, "Inactive")} 
          >
            Deactivate
          </Button>
  
        ),
      },
  ];

  return (
    <Box m="1.5rem 2.5rem">

      <Header title="ACTIVATE USERS" subtitle="List of Users" />
      <Box style={{marginTop:"5vh"}}>
        <FormControl variant="outlined" sx={{ minWidth: 200, marginRight:'2vw' }}>
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
    </Box>
  );
};

export default ActivateUsers;
