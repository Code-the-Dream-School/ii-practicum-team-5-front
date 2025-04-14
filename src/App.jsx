import React from "react";
import HomePage from "./Components/Pages/HomePage";
import PlanPage from "./Components/Pages/PlanPage";
// import Bookmark from "./Components/Pages/Bookmark";
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
    <div className="app">
      <BrowserRouter>
        <Box sx={{ paddingX: "7%", paddingTop: "4%" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/myplan" element={<PlanPage />} />
            <Route path="/login" element="" />
            <Route path="/register" element="" />
            <Route path="/forgotpassword" element="" />
            <Route path="/resetpassword" element="" />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
