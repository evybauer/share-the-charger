import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function AddChargerDialog(props) {
  const [form, setForm] = useState({
    title: "Tesla Supercharger in Downtown Vancouver",
    costPerMinute: 1,
    numberOfChargers: 1,
    street: "401 West Georgia",
    city: "Vancouver",
    stateOrProvince: "BC",
    postCode: "V6C 1B2",
    countryId: "1",
    latitude: 1,
    longitude: 1,
    generalComments: "Available from 9 AM to 10 PM",
    typeOfPlug: 1,
    typeOfCharger: 1,
    active: 1,
    dateAvailableStart: "2020-02-20",
    dateAvailableEnd: "2020-02-28",
    hourStart: "01.00",
    hourEnd: "01.00",
    connectionTypeId: 2,
    ownerId: "5e48e5635376001a00f75fa3"
  });

  const handleInputChange = e => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    console.log('this is my setFrom', setForm);
  };

  // const handleGetGeoCode = () => {
  //   /// SEND API TO GET LAT AND LONG
  //   /// USE SETFORM TO UPDATE STATE
  // };

  const handlePostData = () => {
    // handleGetGeoCode();
    console.log(form);
    const body = JSON.stringify(form);
    const url = "http://localhost:8080/chargers";

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        // console.log(res);
        // console.log(res.data);
      });
  };

  return (
    <div>
      <Dialog 
        open={props.open} 
        onClose={props.handleClose} 
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Your Charger</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Please, provide your information to add and share your domestic electric vehicle charger.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={form.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="costPerMinute"
            label="Cost per minute"
            type="number"
            fullWidth
            value={form.costPerMinute}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="numberOfChargers"
            label="Number of chargers"
            type="number"
            fullWidth
            value={form.numberOfChargers}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="street"
            label="Street"
            type="text"
            fullWidth
            value={form.street}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="city"
            label="City"
            type="text"
            fullWidth
            value={form.city}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="stateOrProvince"
            label="State Or Province"
            type="text"
            fullWidth
            value={form.stateOrProvince}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="postCode"
            label="Postal Code"
            type="text"
            fullWidth
            value={form.postCode}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="countryId"
            label="Country"
            type="text"
            fullWidth
            value={form.countryId}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="latitude"
            label="Latitude"
            type="number"
            fullWidth
            value={form.latitude}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="longitude"
            label="Longitude"
            type="number"
            fullWidth
            value={form.longitude}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="generalComments"
            label="General Comments"
            type="text"
            fullWidth
            value={form.generalComments}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="typeOfPlug"
            label="Type of Charger"
            type="text"
            fullWidth
            value={form.typeOfPlug}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="typeOfCharger"
            label="Type of Charger"
            type="text"
            fullWidth
            value={form.typeOfCharger}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="active"
            label="Active"
            type="text"
            fullWidth
            value={form.active}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="dateAvailableStart"
            label="Date Available Start"
            type="date"
            fullWidth
            value={form.dateAvailableStart}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="dateAvailableEnd"
            label="Date Available End"
            type="date"
            fullWidth
            value={form.dateAvailableEnd}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="hourStart"
            label="HourStart"
            type="text"
            fullWidth
            value={form.hourStart}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="hourEnd"
            label="HourEnd"
            type="text"
            fullWidth
            value={form.hourEnd}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="connectionTypeId"
            label="Connection Type Id"
            type="text"
            fullWidth
            value={form.connectionTypeId}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handlePostData} color="primary">
            Add
          </Button>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

