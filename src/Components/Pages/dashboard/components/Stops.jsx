import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MapDialog from "./MapDialog";

const Stops = ({ stops, setStops }) => {
  const nameRef = useRef(null);
  const imageRef = useRef(null);
  const addressRef = useRef(null);
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);

  const handleAddStop = () => {
    if (!nameRef || !imageRef || !addressRef) return;

    const currentStop = {
      name: nameRef.current.value,
      imageURL: imageRef.current.value,
      address: addressRef.current.value,
    };

    setStops([...stops, currentStop]);
    nameRef.current.value = "";
    imageRef.current.value = "";
    addressRef.current.value = "";
    nameRef.current.focus();
  };

  const handleDeleteStop = (stopIndex) => {
    const newStops = [...stops];
    newStops.splice(stopIndex, 1);
    setStops(newStops);
  };

  const handleStopChange = (event) => {
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;
    const newStops = [...stops];
    newStops[index][type] = event.target.value;
    setStops(newStops);
  };

  const handleOpenMap = () => {
    setIsMapDialogOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapDialogOpen(false);
  };

  const handleAddPlaceConfirm = (stop) => {
    setStops([...stops, stop]);
    setIsMapDialogOpen(false);
  };

  return (
    <FormControl fullWidth margin="normal">
      <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
        Stops * <Button onClick={handleOpenMap}>Add Stop Using Map</Button>
      </FormLabel>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {stops.map((stop, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              padding: 2,
            }}
          >
            <img
              src={stop.imageURL}
              alt={stop.name}
              style={{ width: "100px", height: "100px" }}
            />
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <TextField
                required
                variant="outlined"
                fullWidth
                placeholder="Enter the name"
                value={stop.name}
                inputProps={{ "data-index": index, "data-type": "name" }}
                onChange={handleStopChange}
                sx={{ "& input": { background: "white", padding: "6px 12px" } }}
              />
              <TextField
                required
                variant="outlined"
                fullWidth
                placeholder="Enter the image URL"
                value={stop.imageURL}
                inputProps={{ "data-index": index, "data-type": "imageURL" }}
                onChange={handleStopChange}
                sx={{ "& input": { background: "white", padding: "6px 12px" } }}
              />
              <TextField
                required
                variant="outlined"
                fullWidth
                placeholder="Enter the address"
                value={stop.address}
                inputProps={{ "data-index": index, "data-type": "address" }}
                onChange={handleStopChange}
                sx={{ "& input": { background: "white", padding: "6px 12px" } }}
              />
            </Box>
            <IconButton
              aria-label="Remove Stop"
              onClick={() => handleDeleteStop(index)}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 0.5,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <TextField
            inputRef={nameRef}
            required={stops.length === 0}
            variant="outlined"
            fullWidth
            placeholder="Enter the name"
            sx={{ "& input": { background: "white" } }}
          />
          <TextField
            inputRef={imageRef}
            required={stops.length === 0}
            variant="outlined"
            fullWidth
            placeholder="Enter the image URL"
            sx={{ "& input": { background: "white" } }}
          />
          <TextField
            inputRef={addressRef}
            required={stops.length === 0}
            variant="outlined"
            fullWidth
            placeholder="Enter the address"
            sx={{ "& input": { background: "white" } }}
          />
          <Button aria-label="Add Stop" onClick={handleAddStop}>
            Add Stop Manually
          </Button>
        </Box>
      </Box>
      <MapDialog
        isOpen={isMapDialogOpen}
        onClose={handleCloseMap}
        onConfirm={handleAddPlaceConfirm}
      />
    </FormControl>
  );
};

Stops.propTypes = {
  stops: PropTypes.arrayOf(PropTypes.object).isRequired,
  setStops: PropTypes.func.isRequired,
};

export default Stops;
