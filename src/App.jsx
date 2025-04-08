import React from "react";
import Header from "./Components/Header";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { getAllPlans, getPlansByCategory, getSinglePlan, getPlansByUserId } from "./util/functions";
// import { useEffect } from "react";

// const URL = "http://localhost:8000/api/v1/";

function App() {

  // useEffect(() => {
  //   getAllPlans();
  //   getPlansByCategory("academic-and-cultural-tour");
  //   getSinglePlan("oakland-cultural-highlights");
  //   getPlansByUserId("john - smith");
  // }, []);

  return (
    // Routes and paths for pages (CL)
    <div className="app">
      <BrowserRouter>
        <Box sx={{ paddingX: "7%" }}>
          <Header />
        </Box>
        <Routes>
          <Route path="/" element="" />
          <Route path="/myplan" element="" />
          <Route path="/login" element="" />
          <Route path="/register" element="" />
          <Route path="/forgotpassword" element="" />
          <Route path="/resetpassword" element="" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
