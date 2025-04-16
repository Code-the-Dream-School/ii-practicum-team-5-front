import React, { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const ProfilePage = () => {
  const [selectedSection, setSelectedSection] = useState("");

  const menuItems = ["Plans", "Bookmarked", "Done", "Profile"];

  return (
    <Box sx={{ display: "flex", position: "relative", minHeight: "100vh" }}>
      {/* Sidebar with custom CSS */}
      <Box
        sx={{
          width: "204px",
          height: "727px",
          backgroundColor: "#F0F0F0",
          borderRight: "1px solid #ACACAC",
        }}
      >
        <List>
          {menuItems.map((item) => (
            <Box key={item}>
              <ListItem
                button
                onClick={() => setSelectedSection(item)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <ListItemText
                  primary={item}
                  slotProps={{
                    primary: {
                      style: {
                        fontWeight: selectedSection === item ? "bold" : "normal",
                      },
                    },
                  }}
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Box>

      {/* Right section */}
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4">{selectedSection}</Typography>
        {/* We will Replace it with relvant components later */}
      </Box>
    </Box>
  );
};

export default ProfilePage;
