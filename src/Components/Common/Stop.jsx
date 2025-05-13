import React from "react";
import PropTypes from "prop-types";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const Stop = ({ name, imageURL, address }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 2,
        flexDirection: { xs: "column", sm: "row" },
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: 6,
        },
        "& .MuiCardMedia-root": {
          transition: "scale 0.2s ease",
        },
        "&:hover .MuiCardMedia-root": {
          scale: 1.05,
        },
      }}
    >
      {imageURL && (
        <CardMedia
          component="img"
          image={imageURL}
          alt={name}
          sx={{
            width: { xs: "100%", sm: 220 },
            borderRadius: "10px",
            objectFit: "cover",
          }}
        ></CardMedia>
      )}
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body1">{address}</Typography>
      </CardContent>
    </Card>
  );
};

Stop.propTypes = {
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  address: PropTypes.string.isRequired,
};

export default Stop;
