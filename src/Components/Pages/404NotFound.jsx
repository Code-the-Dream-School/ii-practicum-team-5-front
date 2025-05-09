import React from "react";
import NotFoundHeader from "./404Header";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound404() {
  return (
    <>
      <Box
        sx={{
          px: { xs: 2, sm: 4, md: "7%" },
          position: "relative",
          zIndex: 10,
          backgroundColor: "white",
        }}
      >
        <NotFoundHeader />

        <Box
          sx={{
            height: "80vh",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            textAlign: { xs: "center", md: "left" },
            gap: { xs: 4, md: 8 },
            py: 6,
          }}
        >
          {/* Left side (text and button) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
              maxWidth: 500,
            }}
          >
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
                fontWeight: 600,
              }}
            >
              Oops!
            </Typography>

            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "#ff9100",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Something went wrong!
            </Typography>

            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{
                maxWidth: 400,
              }}
            >
              The page you are looking for is not found!
            </Typography>

            <Button
              variant="outlined"
              size="medium"
              component={Link}
              to="/"
              sx={{
                mt: 3,
                px: 3,
                py: 1.5,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              Back to Home
            </Button>
          </Box>

          {/* Right side (image) */}
          <Box
            component="img"
            src="/images/404-header.jpg"
            alt="Page Not Found"
            sx={{
              width: { xs: 200, sm: 300, md: 400 },

              height: "auto",
              animation: "float 3s ease-in-out infinite",
              "@keyframes float": {
                "0%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-15px)" },
                "100%": { transform: "translateY(0px)" },
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default NotFound404;
