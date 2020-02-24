import React, { useState, useEffect, setError } from "react";
import ReactMapGL, { GeolocateControl, Marker, Popup, NavigationControl, FullscreenControl, ScaleControl } from "react-map-gl";
// import Geocoder from 'react-mapbox-gl-geocoder'
// import * as parkData from "../data/skateboard-parks.json";
import RoomIcon from '@material-ui/icons/Room';
// import Button from "@material-ui/core/Button";
import FormDialog from "./FormDialog";
// import Success from "./Success";
import PinDropIcon from '@material-ui/icons/PinDrop';
import EvStationIcon from '@material-ui/icons/EvStation';
import HouseIcon from '@material-ui/icons/House';
import styled from 'styled-components';


var geo = require('mapbox-geocoding');
geo.setAccessToken(process.env.REACT_APP_MAPBOX_TOKEN);


const Div = styled.div`
  text-align: center;
`;

const geolocateStyle = {
  position: 'fixed',
  bottom: 30,
  right: 0,
  margin: 10
};

const fullscreenControlStyle = {
  position: 'fixed',
  bottom: 158,
  right: 0,
  margin: 10
};

const navStyle = {
  position: 'fixed',
  bottom: 65,
  right: 0,
  margin: 10
};

const scaleControlStyle = {
  position: 'fixed',
  bottom: 10,
  right: 0,
  margin: 10
};

export default function Map() {

  const [viewport, setViewport] = useState({
    latitude: 49.282730,
    longitude: -123.120735,
    width: "100vw",
    height: "96.35vh",
    zoom: 13
  });

  const [selectedPark, setSelectedPark] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [points, setPoints] = useState([]);
  const reg = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/

  // console.log('points:', points);

  const address = [];

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    console.log(geo)


    fetch(`http://localhost:8080/chargers/byCity/Vancouver`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.charger.map(d => {
          const p = {
            id: d._id,
            title: d.title,
            long: d.longitude,
            lat: d.latitude,
            costPerKWh: d.costPerKWh,
            numberOfChargers: d.numberOfChargers,
            street: d.street,
            city: d.city,
            stateOrProvince: d.stateOrProvince,
            postCode: d.postCode,
            countryId: d.countryId,
            latitude: d.latitude,
            longitude: d.longitude,
            generalComments: d.generalComments,
            active: d.active,
            dateAvailableStart: d.dateAvailableStart,
            dateAvailableEnd: d.dateAvailableEnd,
            hourStart: d.hourStart,
            hourEnd: d.hourEnd,
            connectionTypeId: d.connectionTypeId._id,
            ownerId: d.ownerId._id,
            typeOfCharger: d.typeOfCharger
          };
          console.log(p)
          if (reg.test(p.lat)) {
            address.push(p);
          }
        });
      });
    setPoints(address);

    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPoint(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    }
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

  function PinIconType(props) {
    if (props.point.typeOfCharger === 'Domestic') {
      return <HouseIcon
        onClick={e => {
          e.preventDefault();
          setSelectedPoint(props.point);
        }}
      ></HouseIcon>
    } else {
      return <EvStationIcon
        onClick={e => {
          e.preventDefault();
          setSelectedPoint(props.point);
        }}
      ></EvStationIcon>
    }
  }



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
        {/* MAPBOX CONTROLS BELOW */}
        <div style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl />
        </div>
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />

        {/* MAPBOX PINS BELOW */}
        {points.map(point => (
          <Marker key={point.id} latitude={point.lat} longitude={point.long}>
            <PinIconType point={point} />
          </Marker>
        ))}

        {selectedPoint ? (
          <Popup
            latitude={selectedPoint.lat}
            longitude={selectedPoint.long}
            onClose={() => {
              setSelectedPoint(null);
            }}
          >
            <Div>
              <h2>{selectedPoint.title}</h2>
              <p>{selectedPoint.street}{" | "}{selectedPoint.city}</p>
              <FormDialog pin={selectedPoint} />
            </Div>
          </Popup>
        ) : null}

      </ReactMapGL>
    </div>
  )
}