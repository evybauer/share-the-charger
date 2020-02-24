import React, { useState, useEffect } from 'react';
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
    title: props.title,
    costPerKWh: props.costPerKWh,
    numberOfChargers: props.numberOfChargers,
    street: props.street,
    city: props.city,
    stateOrProvince: props.stateOrProvince,
    postCode: props.postCode,
    countryId: props.countryId,
    latitude: props.latitude,
    longitude: props.longitude,
    generalComments: props.generalComments,
    active: undefined,
    dateAvailableStart: props.dateAvailableStart,
    dateAvailableEnd: props.dateAvailableEnd,
    hourStart: props.hourStart,
    hourEnd: props.hourEnd,
    connectionTypeId: props.connectionTypeId,
    ownerId: "5e52d643ff366d01abe73b1f"
  });

  const [submitForm, setSubmitForm] = useState({})

  const handleInputChange = e => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    console.log('this is my form', form);
  };

  async function getGeoCode(address) {
    return fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=" + process.env.REACT_APP_MAPBOX_TOKEN)
      .then((response) => response.json())
  }

  useEffect(() => {
    const url = "http://localhost:8080/chargers";

    console.log('SUBMITFORM:')
    console.log(submitForm)

    const body = JSON.stringify(submitForm);
    axios.post(url, body, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log('form in handlePost Data', submitForm)
        setForm({})
        props.handleClose()
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [submitForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const address = form.street + ', ' + form.city + ", " + form.stateOrProvince + ' ' + form.postCode
    console.log(address)
    const latlong = await getGeoCode(address);
    const f = form
    f.latitude = latlong.features[0].geometry.coordinates[1];
    f.longitude = latlong.features[0].geometry.coordinates[0];
    f.active = true
    console.log(f)
    console.log(latlong.features[0].geometry.coordinates[1])
    setSubmitForm(f);

  }

  // const handlePostData = async () => {
  // };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Your Charger</DialogTitle>
        <form onSubmit={handleSubmit}>
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
              id="costPerKWh"
              label="Cost per KWh"
              type="number"
              fullWidth
              value={form.costPerKWh}
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
              id="generalComments"
              label="General Comments"
              type="text"
              fullWidth
              value={form.generalComments}
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
            <Button type="submit" color="primary">
              Add
          </Button>
            <Button onClick={props.handleClose} color="primary">
              Cancel
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}