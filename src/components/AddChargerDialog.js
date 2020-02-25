import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

import {
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: amber,
  },
});

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

  const handleExitTitle = e => {
    const { value } = e.target;

  if (value === "") {
      setForm({ ...form, ["errorTitle"]: true, ["helperTextTitle"]: "Title is empty" })
    } else {
      setForm({ ...form, ["errorTitle"]: false, ["helperTextTitle"]: "" })
    }
  }

  const handleExitCostPerKwh = e => {
    const { value } = e.target;
    const cpk = validateCostPerKwh(value);

  function validateCostPerKwh(costPerKWh) {
    var characteres = /^(\(?\+?[0-9]*\)?)?[0-9_\-()]*$/;
    return characteres.test(String(costPerKWh));
  }

   if (!cpk && value !== "") {
      setForm({ ...form, ["errorCostPerKwh"]: true, ["helperTextCostPerKwh"]: "Characters are not allowed on cost per KWh" })
    } else if (value === "") {
      setForm({ ...form, ["errorCostPerKwh"]: true, ["helperTextCostPerKwh"]: "Cost per KWh is empty" })
    } else {
      setForm({ ...form, ["errorCostPerKwh"]: false, ["helperTextCostPerKwh"]: "" })
    }
  }

  const handleExitNumberOfChargers = e => {
    const { value } = e.target;
    const noc = validateNumberOfChargers(value);

  function validateNumberOfChargers(numberOfChargers) {
    var characteres = /^(\(?\+?[0-9]*\)?)?[0-9_\-()]*$/;
    return characteres.test(String(numberOfChargers));
  }

   if (!noc && value !== "") {
      setForm({ ...form, ["errorNumberOfChargers"]: true, ["helperTextNumberOfChargers"]: "Characters are not allowed on number of chargers" })
    } else if (value === "") {
      setForm({ ...form, ["errorNumberOfChargers"]: true, ["helperTextNumberOfChargers"]: "Number of Chargers is empty" })
    } else {
      setForm({ ...form, ["errorNumberOfChargers"]: false, ["helperTextNumberOfChargers"]: "" })
    }
  }

  const handleExitStreet = e => {
    const { value } = e.target;
    const db = validateStreet(value);

  function validateStreet(street) {
    var characteres = /^[a-zA-Z0-9,.!? ]*$/i;
    return characteres.test(String(street));
  }

   if (!db && value !== "") {
      setForm({ ...form, ["errorStreet"]: true, ["helperTextStreet"]: "Special characteres (!@#$%ˆ&*) are not allowed on street" })
    } else if (value === "") {
      setForm({ ...form, ["errorStreet"]: true, ["helperTextStreet"]: "Street is empty" })
    } else {
      setForm({ ...form, ["errorStreet"]: false, ["helperTextStreet"]: "" })
    }
  }

  const handleExitCity = e => {
    const { value } = e.target;
    const ct = validateCity(value);

  function validateCity(city) {
    var characteres = /^[a-zA-Z0-9,.]{1,}$/;
    return characteres.test(String(city));
  }

   if (!ct && value !== "") {
      setForm({ ...form, ["errorCity"]: true, ["helperTextCity"]: "Special characteres (!@#$%ˆ&*) are not allowed on city" })
    } else if (value === "") {
      setForm({ ...form, ["errorCity"]: true, ["helperTextCity"]: "City is empty" })
    } else {
      setForm({ ...form, ["errorCity"]: false, ["helperTextCity"]: "" })
    }
  }

  const handleExitStateOrProvince = e => {
    const { value } = e.target;
    const ct = validateStateOrProvince(value);

  function validateStateOrProvince(stateOrProvince) {
    var characteres = /[A-Z].*[A-Z]/;
    return characteres.test(String(stateOrProvince));
  }

   if (!ct && value !== "") {
      setForm({ ...form, ["errorStateOrProvince"]: true, ["helperTextStateOrProvince"]: "Please, use max. 2 UPPER CASE characters (e.g: BC). Special characteres (!@#$%ˆ&*) or numbers are not allowed on state of province" })
    } else if (value === "") {
      setForm({ ...form, ["errorStateOrProvince"]: true, ["helperTextStateOrProvince"]: "State or Province is empty" })
    } else {
      setForm({ ...form, ["errorStateOrProvince"]: false, ["helperTextStateOrProvince"]: "" })
    }
  }

  const handleExitPostalCode = e => {
    const { value } = e.target;
    const pc = validatePostalCode(value);

    function validatePostalCode(postalCode) {
      var characteres = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      return characteres.test(String(postalCode));
    }

    if (!pc && value !== "") {
      setForm({ ...form, ["errorPostalCode"]: true, ["helperTextPostalCode"]: "Postal code cannot contain special characteres (-,@#!$%ˆ&*) or blank spaces" })
    } else if (value === "") {
      setForm({ ...form, ["errorPostalCode"]: true, ["helperTextPostalCode"]: "Postal code is empty" })
    } else {
      setForm({ ...form, ["errorPostalCode"]: false, ["helperTextPostalCode"]: "" })
    }
  }

  const handleExitCountry = e => {
    const { value } = e.target;
    const ct = validateCountry(value);

  function validateCountry(country) {
    var characteres = /^[A-Z]+$/;
    return characteres.test(String(country));
  }

    if (!ct && value !== "") {
      setForm({ ...form, ["errorCountry"]: true, ["helperTextCountry"]: "Invalid Country" })
    } else if (value === "") {
      setForm({ ...form, ["errorCountry"]: true, ["helperTextCountry"]: "Country is empty" })
    } else {
      setForm({ ...form, ["errorCountry"]: false, ["helperTextCountry"]: "" })
    }
  }

  const handleExitGeneralComments = e => {
    const { value } = e.target;

  if (value === "") {
      setForm({ ...form, ["errorGeneralComments"]: true, ["helperTextGeneralComments"]: "General Comments is empty" })
    } else {
      setForm({ ...form, ["errorGeneralComments"]: false, ["helperTextGeneralComments"]: "" })
    }
  }

  // const handleExitDateAvailableStart = e => {
  //   const { value } = e.target;

  //   let dateAvStart = new Date(value);

  //   console.log((dateAvStart));
  //   console.log(new Date(value))
    
  //   if (value !== "" && dateAvStart < new Date()) {
  //     setForm({ ...form, ["errorDateAvailableStart"]: true, ["helperTextDateAvailableStart"]: "Date available start is invalid" })
  //     } else if (dateAvStart === "") {
  //       setForm({ ...form, ["errorDateAvailableStart"]: true, ["helperTextDateAvailableStart"]: "Date available start is empty" })
  //     } else {
  //       setForm({ ...form, ["errorDateAvailableStart"]: false, ["helperTextDateAvailableStart"]: "" })
  //     }
  //   }

  // const handleExitDateAvailableEnd = e => {
  //   const { value } = e.target;

  //   let dateAvEnd = new Date(value);
  //   let dateAvStart = new Date(form.dateAvailableStart)

  //   console.log((dateAvEnd));
    
    
    
  //   if (value !== "" && dateAvEnd < dateAvStart) {
  //     setForm({ ...form, ["errorDateAvailableEnd"]: true, ["helperTextDateAvailableEnd"]: "Date available end must be after start date" })
  //     } else if (dateAvEnd === "") {
  //       setForm({ ...form, ["errorDateAvailableEnd"]: true, ["helperTextDateAvailableEnd"]: "Date available end is empty" })
  //     } else {
  //       setForm({ ...form, ["errorDateAvailableEnd"]: false, ["helperTextDateAvailableEnd"]: "" })
  //     }
  //   } 

  // const handleExitHourStart = e => {
  //   // const { value } = e.target;

  //   // let dateAvStart = new Date(value);

  //   // console.log((dateAvStart));
  //   // console.log(new Date(value))
    
  //   // if (value !== "" && dateAvStart < new Date()) {
  //   //   setForm({ ...form, ["errorDateAvailableStart"]: true, ["helperTextDateAvailableStart"]: "Date available start is invalid" })
  //   //   } else if (dateAvStart === "") {
  //   //     setForm({ ...form, ["errorDateAvailableStart"]: true, ["helperTextDateAvailableStart"]: "Date available start is empty" })
  //   //   } else {
  //   //     setForm({ ...form, ["errorDateAvailableStart"]: false, ["helperTextDateAvailableStart"]: "" })
  //   //   }
  //   }

  // const handleExitHourEnd = e => {
  //   // const { value } = e.target;

  //   // let dateAvEnd = new Date(value);
  //   // let dateAvStart = new Date(form.dateAvailableStart)

  //   // console.log((dateAvEnd));
    
    
    
  //   // if (value !== "" && dateAvEnd < dateAvStart) {
  //   //   setForm({ ...form, ["errorDateAvailableEnd"]: true, ["helperTextDateAvailableEnd"]: "Date available end must be after start date" })
  //   //   } else if (dateAvEnd === "") {
  //   //     setForm({ ...form, ["errorDateAvailableEnd"]: true, ["helperTextDateAvailableEnd"]: "Date available end is empty" })
  //   //   } else {
  //   //     setForm({ ...form, ["errorDateAvailableEnd"]: false, ["helperTextDateAvailableEnd"]: "" })
  //   //   }
  //   } 


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
          <ThemeProvider theme={theme}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              error={form.errorTitle}
              helperText={form.helperTextTitle}
              value={form.title}
              onChange={handleInputChange}
              onBlur={handleExitTitle}
            />
            <TextField
              margin="dense"
              id="costPerKWh"
              label="Cost per KWh"
              type="number"
              fullWidth
              error={form.errorCostPerKwh}
              helperText={form.helperTextCostPerKwh}
              value={form.costPerKWh}
              onChange={handleInputChange}
              onBlur={handleExitCostPerKwh}
            />
            <TextField
              margin="dense"
              id="numberOfChargers"
              label="Number of chargers"
              type="number"
              fullWidth
              error={form.errorNumberOfChargers}
              helperText={form.helperTextNumberOfChargers}
              value={form.numberOfChargers}
              onChange={handleInputChange}
              onBlur={handleExitNumberOfChargers}
            />
            <TextField
              margin="dense"
              id="street"
              label="Street"
              type="text"
              fullWidth
              error={form.errorStreet}
              helperText={form.helperTextStreet}
              value={form.street}
              onChange={handleInputChange}
              onBlur={handleExitStreet}
            />
            <TextField
              margin="dense"
              id="city"
              label="City"
              type="text"
              fullWidth
              error={form.errorCity}
              helperText={form.helperTextCity}
              value={form.city}
              onChange={handleInputChange}
              onBlur={handleExitCity}
            />
            <TextField
              margin="dense"
              id="stateOrProvince"
              label="State Or Province"
              type="text"
              fullWidth
              error={form.errorStateOrProvince}
              helperText={form.helperTextStateOrProvince}
              value={form.stateOrProvince}
              onChange={handleInputChange}
              onBlur={handleExitStateOrProvince}
            />
            <TextField
              margin="dense"
              id="postCode"
              label="Postal Code"
              type="text"
              fullWidth
              error={form.errorPostalCode}
              helperText={form.helperTextPostalCode}
              value={form.postCode}
              onChange={handleInputChange}
              onBlur={handleExitPostalCode}

            />
            <TextField
              margin="dense"
              id="countryId"
              label="Country"
              type="text"
              fullWidth
              error={form.errorCountry}
              helperText={form.helperTextCountry}
              value={form.countryId}
              onChange={handleInputChange}
              onBlur={handleExitCountry}
            />
            <TextField
              margin="dense"
              id="generalComments"
              label="General Comments"
              type="text"
              fullWidth
              // error={form.errorGeneralComments}
              // helperText={form.helperTextGeneralComments}
              value={form.generalComments}
              onChange={handleInputChange}
              // onBlur={handleExitGeneralComments}

            />
            <TextField
              margin="dense"
              id="dateAvailableStart"
              label="Date Available Start"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              // error={form.errorDateAvailableStart}
              // helperText={form.helperTextDateAvailableStart}
              value={form.dateAvailableStart}
              onChange={handleInputChange}
              // onBlur={handleExitDateAvailableStart}

            />
            <TextField
              margin="dense"
              id="dateAvailableEnd"
              label="Date Available End"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              // error={form.errorDateAvailableEnd}
              // helperText={form.helperTextDateAvailableEnd}
              value={form.dateAvailableEnd}
              onChange={handleInputChange}
              // onBlur={handleExitDateAvailableEnd}
            />
            <TextField
              margin="dense"
              id="hourStart"
              label="HourStart"
              type="text"
              fullWidth
              // error={form.errorDateAvailableEnd}
              // helperText={form.helperTextDateAvailableEnd}
              value={form.hourStart}
              onChange={handleInputChange}
              // onBlur={handleExitDateAvailableEnd}
            />
            <TextField
              margin="dense"
              id="hourEnd"
              label="HourEnd"
              type="text"
              fullWidth
              // error={form.errorDateAvailableEnd}
              // helperText={form.helperTextDateAvailableEnd}
              value={form.hourEnd}
              onChange={handleInputChange}
              // onBlur={handleExitDateAvailableEnd}
            />
            <TextField
              margin="dense"
              id="connectionTypeId"
              label="Connection Type Id"
              type="text"
              fullWidth
              // error={form.errorDateAvailableEnd}
              // helperText={form.helperTextDateAvailableEnd}
              value={form.connectionTypeId}
              onChange={handleInputChange}
              // onBlur={handleExitDateAvailableEnd}
            />
            </ThemeProvider>
          </DialogContent>
          <DialogActions>
          <ThemeProvider theme={theme}>
            <Button type="submit" color="primary">
              Add
          </Button>
            <Button onClick={props.handleClose} color="primary">
              Cancel
          </Button>
          </ThemeProvider>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}