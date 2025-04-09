import React from "react";

import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";

function Footer() {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "#333333",
            color: "white",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              p: 5,
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: "white",
              }}
            >
              <ul style={{ listStyleType: "none" }}>
                <Link href="/" color="primary" underline="none">
                  <li>Home</li>
                </Link>
                <Link href="/" color="primary" underline="none">
                  <li>Browse</li>
                </Link>
                <Link href="/" color="primary" underline="none">
                  <li>About</li>
                </Link>
                <Link href="/" color="primary" underline="none">
                  <li>How It Works</li>
                </Link>
                <Link href="/" color="primary" underline="none">
                  <li>Contact Us</li>
                </Link>
                <Link href="/" color="primary" underline="none">
                  <li>Success Stories</li>
                </Link>
              </ul>
            </Typography>
          </Box>

          <Box
            sx={{
              p: 5,
              marginRight: "400px",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: "white",
              }}
            >
              <ul style={{ listStyleType: "none" }}>
                <Link href="/" color="primary" underline="none">
                  <li>Museum</li>
                </Link>
                <Link href="/" color="primary" underline="none">
                  <li>Dining Out</li>
                </Link>
                <Link href="/" color="primary" underline="none">
                  <li>Nature Hiking</li>
                </Link>
                <Link href="/" color="primary" underline="none">
                  <li>Beach</li>
                </Link>
                <Link href="/" color="primary" underline="none">
                  <li>Kid Friendly</li>
                </Link>
                <Link href="/" color="primary" underline="none">
                  <li>Night Life</li>
                </Link>
              </ul>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Footer;
