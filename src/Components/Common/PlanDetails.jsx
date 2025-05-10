import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Paper,
  ImageList,
  ImageListItem,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import StopsOnMap from "./StopsOnMap";
import { Link } from "react-router-dom";
import Stops from "./Stops";

const PlanDetails = ({
  title,
  rate,
  reviewCount,
  type,
  distance,
  stopCount,
  images,
  description,
  duration,
  userId,
  categoryId,
  stops,
}) => {
  return (
    <>
      {/* Plan Card */}
      <Paper
        elevation={2}
        sx={{
          padding: 2,
          borderRadius: 4,
        }}
      >
        {/* Icon Buttons */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 1 }}
        >
          <FavoriteBorderIcon sx={{ cursor: "pointer", color: "#424242" }} />
          <ShareIcon sx={{ cursor: "pointer", color: "#424242" }} />
          <BookmarkBorderIcon sx={{ cursor: "pointer", color: "#424242" }} />
        </Box>

        {/* Title */}
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>

        {/* Title Details */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >
            Created by <Link to={`/user/${userId._id}`}>{userId.name}</Link>
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >
            {rate}⭐ ({reviewCount} reviews)
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >{`${type}`}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >{`${distance} miles`}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >{`${stopCount} places`}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >{`${duration} hours`}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >
            <Link to={`/category/${categoryId._id}`}>{categoryId.name}</Link>
          </Typography>
        </Box>
      </Paper>

      {/* Image List */}
      {images?.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: 4,
            marginTop: 4,
            marginBottom: 4,
          }}
        >
          {/* Large Placeholder Image */}
          <StopsOnMap stops={stops} />
          {/* <Box
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 2,
            }}
          /> */}

          <ImageList
            sx={{
              width: 300,
              height: 450,
            }}
            cols={1}
            rowHeight={200}
          >
            {images.map((url, index) => (
              <ImageListItem key={index}>
                <img src={url} alt={`Plan image ${index + 1}`} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}

      {/* Description */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="body1">{description}</Typography>
      </Box>

      {/* Stops Section */}
      {stops.length > 0 && <Stops stops={stops} />}
    </>
  );
};

export default PlanDetails;

PlanDetails.propTypes = {
  title: PropTypes.string,
  rate: PropTypes.number,
  reviewCount: PropTypes.number,
  type: PropTypes.string,
  distance: PropTypes.number,
  stopCount: PropTypes.number,
  description: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  duration: PropTypes.number,
  userId: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }),
  categoryId: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }),
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      imageURL: PropTypes.string,
      address: PropTypes.string,
      location: PropTypes.arrayOf(PropTypes.number),
    }),
  ),
};
