import L from "leaflet";

const defaultMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [13, 0],
});

export { defaultMarker };


// This code defines a new Leaflet Icon object called defaultMarker and exports it for use in other parts of the React application.

// The Icon object is used to define the appearance of markers on a Leaflet map. In this case, the defaultMarker object uses the default Leaflet marker icon, which is a small image of a pushpin. The iconUrl property specifies the URL of the image to use for the marker, and the iconSize property specifies the size of the image in pixels. The iconAnchor property specifies the point on the image that should be anchored to the map coordinate where the marker is placed.

// By defining the defaultMarker object in this