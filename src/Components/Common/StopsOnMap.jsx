import React, { useEffect } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";

const MarkersAndPath = ({ stops }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !window.google) return;

    const gmaps = window.google.maps;
    const bounds = new gmaps.LatLngBounds();

    // Create markers and info windows for each stop
    const infoWindow = new gmaps.InfoWindow();
    stops.forEach((stop, index) => {
      if (stop.location.length !== 2) return;

      const position = {
        lat: stop.location[0],
        lng: stop.location[1],
      };

      // Extend bounds to include this stop
      bounds.extend(position);

      const marker = new gmaps.Marker({
        position,
        map,
        title: stop.name,
        label: {
          text: `${index + 1}`,
          color: "#ffffff",
          fontWeight: "bold",
          fontSize: "14px",
        },
      });

      // Set custom content (can be HTML)
      const content = `
        <div style="max-width:260px">
          <img src="${stop.imageURL}" alt="${stop.name}" style="width:100%;height:auto;border-radius:4px;" />
          <h3>${stop.name}</h3>
        </div>
      `;

      // Add click listener to marker
      marker.addListener("click", () => {
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      // Fit map to bounds once all markers are placed
      map.fitBounds(bounds);
    });
  }, [map]);

  return null;
};

MarkersAndPath.propTypes = {
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      imageURL: PropTypes.string,
      address: PropTypes.string,
      location: PropTypes.arrayOf(PropTypes.number),
    }),
  ),
};

const StopsOnMap = ({ stops }) => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <Map
        style={{ width: "100%", height: "100%" }}
        gestureHandling={"greedy"}
        options={{
          gestureHandling: "cooperative",
          streetViewControl: false,
          fullscreenControl: false,
        }}
      />
      <MarkersAndPath stops={stops} />
    </APIProvider>
  );
};

StopsOnMap.propTypes = {
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      imageURL: PropTypes.string,
      address: PropTypes.string,
      location: PropTypes.arrayOf(PropTypes.number),
    }),
  ),
};

export default StopsOnMap;
