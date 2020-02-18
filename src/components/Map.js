import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import * as parkData from "../data/skateboard-parks.json";
import RoomIcon from "@material-ui/icons/Room";
// import Button from "@material-ui/core/Button";
// import Card from "./components/Card";
import FormDialog from "./FormDialog";
import AddButton from "./AddButton";

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    }
  }, [])

  return (
  <div>
    <AddButton />
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/lealinin/ck6r7sbd90tgg1iljxz0w6asw"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
    >
      {parkData.features.map((park) => (
        <Marker 
          key={park.properties.PARK_ID}
          latitude={park.geometry.coordinates[1]}
          longitude={park.geometry.coordinates[0]}
        > 
          <button className="marker-btn" onClick={(e) => {
            e.preventDefault();
            setSelectedPark(park);
          }}>
            <RoomIcon />
            {/* <img src="/skateboarding.svg" alt="Skate Park Icon" /> */}
          </button>
        </Marker>
      ))}

      {selectedPark ? (
        <Popup 
          latitude={selectedPark.geometry.coordinates[1]} 
          longitude={selectedPark.geometry.coordinates[0]}
          onClose={() => {
            setSelectedPark(null)
          }}
        >
          
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
            <FormDialog />
            {/* <Button variant="contained" color="primary" href="#contained-buttons">
              Book
            </Button> */}
          </div>
        </Popup>
      ) : null }
    </ReactMapGL>
  </div>
  )
}