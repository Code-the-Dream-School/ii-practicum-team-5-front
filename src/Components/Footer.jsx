import React from "react";

import { Typography, Box, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        marginTop: 6,
        backgroundColor: "#333333",
        color: "white",
        display: "flex",
        justifyContent: { xs: "center", sm: "space-evenly" },
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "center", sm: "flex-start" },
        flexWrap: "wrap",
        textAlign: { xs: "center", sm: "left" },
        px: 2,
        py: 4,
      }}
    >
      <Box
        sx={{
          p: { xs: 0, sm: 2 },
          mb: { xs: 2, sm: 0 },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: 12,
            color: "white",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
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
          p: { xs: 0, sm: 2 },
          mb: { xs: 2, sm: 0 },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: 12,
            color: "white",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
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
    </Box>
  );
}
export default Footer;
