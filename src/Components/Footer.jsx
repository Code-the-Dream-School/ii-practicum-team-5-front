import React, { useState, useEffect } from "react";
import { fetchPlans } from "../util";
import { Typography, Box, Link } from "@mui/material";

function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const result = await fetchPlans(`plans/category`, "", setError);
        setCategories(result || []);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchAllCategories();
  }, []);

  const setError = (errorMessage) => {
    console.log("error", errorMessage);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#333333",
        color: "white",
        mt: 6,
        px: 2,
        py: 4,
      }}
    >
      <Box
        sx={{
          m: "0 auto",
          width: "100%",
          maxWidth: "1300px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          rowGap: 2,
        }}
      >
        <Box
          sx={{
            p: { xs: 0, sm: 2 },
            mb: { xs: 2, sm: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Link href="/">
            <img
              src="/images/logo-text-3-light.png"
              width={160}
              style={{ opacity: 0.7, marginBottom: 10 }}
            />
          </Link>
          <Typography variant="body2" maxWidth="300px">
            ZipTrip helps you plan fun and efficient one-day trips in cities
            across the U.S. Discover attractions, food spots, and walking paths
            all in one place.
          </Typography>
          <Typography variant="body2" sx={{ mt: 6 }}>
            &copy; 2025 ZipTrip, All rights reserved.
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: { xs: "100%", sm: "auto" },
            display: "flex",
            justifyContent: { xs: "space-between", sm: "space-around" },
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              p: { xs: 0, sm: 2 },
              mb: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              component="div"
              sx={{
                fontSize: 12,
                color: "white",
              }}
            >
              <ul
                style={{
                  listStyleType: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Link href="/" color="primary" underline="none">
                  <li style={{ fontWeight: "bold", fontSize: 18 }}>Home</li>
                </Link>
                <Link
                  href="https://ii-practicum-team-5-back-1.onrender.com/api-docs"
                  target="_blank"
                  color="primary"
                  underline="none"
                >
                  <li>API Documentation</li>
                </Link>
                <Link
                  href="https://github.com/Code-the-Dream-School/ii-practicum-team-5-back"
                  target="_blank"
                  color="primary"
                  underline="none"
                >
                  <li>Backend Repository</li>
                </Link>
                <Link
                  href="https://github.com/Code-the-Dream-School/ii-practicum-team-5-front"
                  target="_blank"
                  color="primary"
                  underline="none"
                >
                  <li>Frontend Repository</li>
                </Link>
                <Link
                  href="https://codethedream.org/classes/practicum"
                  target="_blank"
                  color="primary"
                  underline="none"
                >
                  <li>Practicum Program</li>
                </Link>
                <Link
                  href="https://codethedream.org"
                  target="_blank"
                  color="primary"
                  underline="none"
                >
                  <li>Code The Dream</li>
                </Link>
              </ul>
            </Typography>
          </Box>

          <Box
            sx={{
              p: { xs: 0, sm: 2 },
              mb: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              component="div"
              sx={{
                fontSize: 12,
                color: "white",
              }}
            >
              <ul
                style={{
                  listStyleType: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <li style={{ fontWeight: "bold", fontSize: 18 }}>Categories</li>
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/category/${category._id}`}
                    color="primary"
                    underline="none"
                  >
                    <li>{category.name}</li>
                  </Link>
                ))}
              </ul>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default Footer;
