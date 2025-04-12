import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PropTypes from "prop-types";

const PlanCard = ({ image, title, rate, type, distance, stopCount }) => {
  return (
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
          sx={{
            position: "absolute",
            backgroundColor: "white",
            width: 35,
            height: 35,
            marginTop: 1,
          }}
        >
          <BookmarkBorderIcon />
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
  );
};

export default PlanCard;

PlanCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  stopCount: PropTypes.string.isRequired,
};
