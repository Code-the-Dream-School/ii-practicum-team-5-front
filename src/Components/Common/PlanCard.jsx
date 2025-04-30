import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark"
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAuthModal } from "../../context/AuthModalContext";
import { AddBookmark, removeBookmark } from "../../util/dashboard";

const PlanCard = ({
  image,
  title,
  rate,
  type,
  distance,
  stopCount,
  planId,
  isBookmarked=false,
}) => {
  const [bookmark, setBookmark] = useState(isBookmarked);
  const { token } = useAuth();
  const {
    openLogin,
  } = useAuthModal();

  useEffect(() => {

  }, [])

  const handleBookmark = async (e) => {
    e.preventDefault()

    if (!token) return openLogin();

    if (bookmark) {
      const result = await removeBookmark(token, planId, setError)
      if (result) {
        setBookmark(false)
      }
    } else {
      const result = await AddBookmark(token, planId, setError)
      if (result) {
        setBookmark(true)
      }
    }
  }

  const setError = (errorMessage) => {
    console.log("error", errorMessage)
  }

  return (
    <Link to={`/plans/${planId}`} style={{ textDecoration: "none" }}>
      <Card sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: 1,
          }}
        >
          <IconButton
            onClick={handleBookmark}
            sx={{
              position: "absolute",
              backgroundColor: "white",
              width: 35,
              height: 35,
              marginTop: 1,
            }}
          >
            {bookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>
        <CardMedia
          component="img"
          image={image}
          height="195"
          alt={title}
          sx={{ borderRadius: "10px", objectFit: "cover" }}
        ></CardMedia>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "flex-start",
            backgroundColor: "transparent",
          }}
        >
          <Typography>{title}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              gap: 1,
            }}
          >
            <Typography sx={{ color: "#B0B0B0", fontSize: "12px" }}>
              {rate}⭐
            </Typography>
            <Typography sx={{ color: "#B0B0B0", fontSize: "12px" }}>
              {type}
            </Typography>
            <Typography sx={{ color: "#B0B0B0", fontSize: "12px" }}>
              {distance}
            </Typography>
            <Typography sx={{ color: "#B0B0B0", fontSize: "12px" }}>
              {stopCount}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlanCard;

PlanCard.propTypes = {
  planId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rate: PropTypes.number,
  type: PropTypes.string,
  distance: PropTypes.string,
  stopCount: PropTypes.string,
  isBookmarked: PropTypes.bool,
};
