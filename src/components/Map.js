import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import Geocoder from 'react-mapbox-gl-geocoder'
import * as parkData from "../data/skateboard-parks.json";
import RoomIcon from '@material-ui/icons/Room';
// import Button from "@material-ui/core/Button";
import FormDialog from "./FormDialog";
// import Success from "./Success";
import PinDropIcon from '@material-ui/icons/PinDrop';

var geo = require('mapbox-geocoding');
geo.setAccessToken(process.env.REACT_APP_MAPBOX_TOKEN);

export default function Map() {

  const [viewport, setViewport] = useState({
    latitude: 49.282730,
    longitude: -123.120735,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  const [selectedPark, setSelectedPark] = useState(null);
  const [points, setPoints] = useState([]);
  console.log('points:', points);

  useEffect(() => {
    geo.geocode('mapbox.places', 'Vancouver Public Library, Central Library, 350 W Georgia St, Vancouver, BC V6B 6B1', function (err, geoData) {
      console.log(geoData);
      if (geoData) {
        const {features} = geoData;
        const feature = features[0]
        const geometries = [{id: feature.id, long: feature.geometry.coordinates[0], lat: feature.geometry.coordinates[1]}];
        setPoints(geometries);
      }
      console.log(Object.keys(geoData));
    });  
  }, []);
  

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
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/lealinin/ck6u2qfkt1sp51imqh3o4jr3b"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
    >
      {points.map(({id, long, lat}) => <Marker key={id} latitude={lat} longitude={long}><PinDropIcon></PinDropIcon></Marker>)}

      {parkData.features.map((park) => (
        <Marker 
          key={park.properties.PARK_ID}
          latitude={park.geometry.coordinates[1]}
          longitude={park.geometry.coordinates[0]}
        >
            <RoomIcon onClick={(e) => {
              e.preventDefault();
              setSelectedPark(park);
            }}>
            </RoomIcon>
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
          </div>
        </Popup>
      ) : null }
    </ReactMapGL>
  </div>
  )
}