import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { defaultMarker } from "./default-marker";
import { useQuery } from "react-query";

// import { useMap } from "react-leaflet/lib/hooks";

interface CovidMapProps {
  countriesData?: CountryData[];
}

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
  };
  cases: number;
  recovered: number;
  deaths: number;
}

const LeafletMap = () => {
  const { isLoading, data } = useQuery("mapData", () => {
    return axios.get("https://disease.sh/v3/covid-19/countries");
  });

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {data?.data?.map((country: any) => (
        <Marker
          key={country.country}
          icon={defaultMarker}
          position={[country.countryInfo.lat, country.countryInfo.long]}
          // position={[51.505, -0.09]}
        >
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <p>Total Cases: {country.cases}</p>
              <p>Recovered: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>

        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
// This code defines a React component called LeafletMap that displays a map using the Leaflet library. The map displays markers for each country in the array of country data, with each marker showing the country name, total cases, recovered cases, and deaths.

// The LeafletMap component uses the useQuery hook from the react-query library to fetch data about COVID-19 cases in different countries from the disease.sh API. The useQuery hook takes a query key ("mapData") and a function that returns a promise (in this case, an API request using axios). The useQuery hook returns an object with properties isLoading and data, which indicate whether the data is still being loaded and the actual data, respectively.

// The LeafletMap component renders a MapContainer component from the react-leaflet library, which is a wrapper around the Leaflet map object. The MapContainer component takes several properties, such as the center coordinate, zoom level, and scroll wheel zoom behavior. It also takes a style property to set the width of the map.

// Inside the MapContainer component, a TileLayer component is rendered, which displays the map tiles. The TileLayer component takes a URL for the tile server and an attribution string.

// The MapContainer component also renders a list of Marker components, one for each country in the data array. Each Marker component takes a key property, an icon property (which is set to the defaultMarker object defined in the default-marker module), and a position property that specifies the latitude and longitude of the marker. Each Marker component also renders a Popup component, which displays the country name, total cases, recovered cases, and deaths in a div element.

// Overall, the code you provided defines a React component that displays a map with markers for each country in an array of country data, with each marker showing the country name, total cases, recovered cases, and deaths. The component uses the react-query library to fetch data about COVID-19 cases in different countries from the disease.sh API.