import React, { useState, useEffect } from "react";
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
  List,
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
} from "@mui/material";
import axios from "axios";

const ContactUs = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true); // Set to true for admin, you can set it based on user roles

  useEffect(() => {
    // Fetch messages from your server or API here
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5001/general/getMessage");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

  const handleReplyClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSendMessage = async () => {
    try {
      // Send the message and handle it on your server
      const response = await axios.post("http://localhost:5001/general/getMessage", {
        userId: selectedMessage.userId,
        message: message,
      });
      console.log("Message sent:", response.data);

      // Add the sent message to the chat
      setMessages([...messages, { ...response.data, isSent: true }]);

      setOpenDialog(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      (!selectedRole || message.role === selectedRole) &&
      message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box m="1.5rem 2.5rem">
      <h1>Message Center</h1>
      <Box style={{ marginTop: "5vh" }}>
        <FormControl variant="outlined" sx={{ minWidth: 200, marginRight: '2vw' }}>
          <InputLabel>Select User Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            label="Select User Role"
          >
            <MenuItem value=""><em>All Roles</em></MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            {/* Add other roles here */}
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
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <List>
            {filteredMessages.map((message) => (
              <ListItem
                key={message._id}
                onClick={() => handleMessageClick(message)}
                button
              >
                <ListItemText
                  primary={message.name}
                  secondary={message.subject}
                />
                {isAdmin && (
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ fontWeight: "bold", backgroundColor: "#198754" }}
                      onClick={handleReplyClick}
                    >
                      Reply
                    </Button>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        </div>
        {selectedMessage && (
          <div style={{ flex: 2 }}>
            <h2>Message Details</h2>
            <div>{selectedMessage.name}</div>
            <div>{selectedMessage.subject}</div>
            <div>{selectedMessage.content}</div>
          </div>
        )}
      </div>
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
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactUs;
