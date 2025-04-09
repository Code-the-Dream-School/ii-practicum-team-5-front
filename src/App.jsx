import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { getAllData } from "./util/index";

// const URL = "http://localhost:8000/api/v1/";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const myData = await getAllData(URL);
  //     setMessage(myData.data);
  //   })();

  //   return () => {
  //     console.log("unmounting");
  //   };
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
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
