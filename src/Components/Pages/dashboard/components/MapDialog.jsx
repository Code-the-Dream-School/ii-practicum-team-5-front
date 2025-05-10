import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const MapDialog = ({ isOpen, onClose, onConfirm }) => {
  const dummyDiv = useRef(null);
  const [selected, setSelected] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const isMobile = window.innerWidth < 600;

  const handleMapClick = (e) => {
    const lat = e.detail.latLng.lat;
    const lng = e.detail.latLng.lng;
    console.log(e.detail);
    setSelected({ name: "Custom Location", lat, lng });
    setPlaceId(e.detail.placeId);
  };

  useEffect(() => {
    if (!placeId || !window.google || !dummyDiv.current) return;

    const service = new window.google.maps.places.PlacesService(
      dummyDiv.current,
    );

    service.getDetails(
      {
        placeId,
        fields: [
          "name",
          "formatted_address",
          "geometry.location",
          "photos",
          "place_id",
        ],
      },
      (place, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place
        ) {
          const location = place.geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          const imageURL = place.photos?.[0]?.getUrl({ maxWidth: 400 }) || null;

          onConfirm({
            name: place.name,
            address: place.formatted_address,
            location: [lat, lng],
            imageURL,
          });
        } else {
          console.warn("Failed to fetch place details:", status);
        }
      },
    );
  }, [placeId]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullScreen={isMobile}
    >
      <Box style={{ padding: "10px 30px" }}>
        <DialogTitle id="alert-dialog-title">Select a Place</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box sx={{ width: { sx: "100%", sm: "600px" }, height: "500px" }}>
              <APIProvider
                apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                libraries={["places"]}
              >
                <Map
                  style={{ width: "100%", height: "100%" }}
                  onClick={handleMapClick}
                  gestureHandling="greedy"
                  disableDefaultUI={false}
                  options={{
                    streetViewControl: false,
                  }}
                >
                  {selected && (
                    <Marker
                      position={{ lat: selected.lat, lng: selected.lng }}
                    />
                  )}
                </Map>
                <div ref={dummyDiv} style={{ display: "none" }} />
                {selected && (
                  <div style={{ marginTop: "10px" }}>
                    <strong>{selected.name}</strong>
                    <br />
                    Lat: {selected.lat}, Lng: {selected.lng}
                    <br />
                    {selected.address && (
                      <>
                        Address: {selected.address}
                        <br />
                      </>
                    )}
                    {selected.imageUrl && (
                      <img
                        src={selected.imageUrl}
                        alt="Place"
                        style={{ width: "300px", marginTop: "5px" }}
                      />
                    )}
                  </div>
                )}
              </APIProvider>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid darkgray",
            }}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

MapDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default MapDialog;
