import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const PageHeader = () => {
  return (
    <div>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "primary.default",
          boxShadow: "none",
          "& .MuiToolbar-root": { padding: 0 },
        }}
      >
        <Toolbar sx={{ padding: 0 }}>
          <Typography variant="h4" color="inherit" style={{ flexGrow: 1 }}>
            OneDayPlanner
          </Typography>
          <Button
            sx={{
              minWidth: "6%",
              marginRight: "1%",
              backgroundColor: "white",
              color: "#45a049",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "white",
                color: "#45a049",
              },
            }}
          >
            Login
          </Button>
          <Button color="inherit" sx={{ minWidth: "6%" }}>
            Register
          </Button>
        </Toolbar>
      </AppBar>

      {/* image */}
      <Box
        sx={{
          backgroundImage:
            "url(https://s3-alpha-sig.figma.com/img/69dd/4fc2/b65b1798baecddce56c04f76d2d6fc13?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hCHHGb3oW7BPoKBd6wqyHiXy6lCTAwExTguOOCEuj2JqpsZw~Wm4Shzel9RvK55s~VHWoecnlLiLvR~VbM0wVR3AO7D2pnw4uUSjvraO3YJ6rUBbuLTJZPzMfWM3pG7OZNucpEtMdGHxbTdbn5tPbW7tl~FXQ76nhBMYQO0selGSUa61mSg9MMP6dSWVzPiMkpYMbADtWO~ELVun-QeI5cG9P-18j7B6DtCVTiwUlGbCtlETM~K-IDbwCuZHk4ujLy2UqdgccjXYPEH8FSBe~ydo1cfvaIqPa1Iuu1bFLxKaLMvtd~RwjkmGtfgYHzu6Kx4~QG7dlhGjhuBQuSccGg__)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "230px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Box>

      {/* Search Bar */}
      <Box
        sx={{
          position: "absolute",
          transform: "translate( 17%, -50%)",
          // maxWidth: "80%",
          width: "65%",
        }}
      >
        <TextField
          placeholder="Search for a city, activity, or place"
          variant="outlined"
          fullWidth
          size="medium"
          sx={{
            margin: "0 auto",
            backgroundColor: "white",
            borderRadius: "30px",
            boxShadow: "0px 4px 10px rgba(0, 0, 255, 0.2)",
            "& .MuiOutlinedInput-root": {
              borderRadius: "40px",
              height: "60px",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </div>
  );
};

export default PageHeader;
