import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import BatteryCharging20Icon from '@material-ui/icons/BatteryCharging20';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles'; 
import { amber } from '@material-ui/core/colors';
import axios from 'axios';

import {
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: amber,
  },
});


// import Dropdown from './Dropdown';
// import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 3}px 0`,
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit / 2,
    top: theme.spacing.unit / 2,
    color: theme.palette.grey[900],
  },
}));

export default function FormDialog(props) {

  const classes = useStyles();

  console.log('BELOW IS THE PROPS:')
  console.log(props.pin.title);
  // DIALOG
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // INPUTS
  const [form, setForm] = useState({
    chargerId: props.pin.id,
    guestId: props.userState.id,
    date: props.date,
    hours: props.hours,
    totalPrice: "",

    long: props.pin.longitude,
    lat: props.pin.latitude,
    costPerKWh: props.pin.costPerKWh,
    numberOfChargers: props.pin.numberOfChargers,
    title: props.pin.title,
    street: props.pin.street,
    city: props.pin.city,
    stateOrProvince: props.pin.stateOrProvince,
    postCode: props.pin.postCode,
    countryId: props.pin.countryId,
    latitude: props.pin.latitude,
    longitude: props.pin.longitude,
    generalComments: props.pin.generalComments,
    active: props.pin.active,
    dateAvailableStart: props.pin.dateAvailableStart,
    dateAvailableEnd: props.pin.dateAvailableEnd,
    hourStart: props.pin.hourStart,
    hourEnd: props.pin.hourEnd,
    connectionTypeId: props.pin.connectionTypeId._id,
    ownerId: props.pin.ownerId._id
  })

  const handleInputChange = e => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    console.log('This is my form', form);
  }

  const handlePostData = () => {
    console.log(form);
    const body = JSON.stringify(form);
    const url = "http://localhost:8080/reservations";
    const urlemail = "http://localhost:8080/email/reservation";
    const bodyemail = {
      emailTo: props.userState.email
    }

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        handleClose();

        /// SEND EMAIL TO USER THAT SIGNUP
        axios
        .post(urlemail, bodyemail, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  // INPUT VALIDATION

  const handleExitDate = e => {
  const { value } = e.target;

  let date = new Date(value);
  console.log(date);
  if (value !== "" && date < new Date()) {
    setForm({ ...form, ["errorDate"]: true, ["helperTextDate"]: "Invalid date" })
    } else if (value === "") {
      setForm({ ...form, ["errorDate"]: true, ["helperTextDate"]: "Date is empty" })
    } else {
      setForm({ ...form, ["errorDate"]: false, ["helperTextDate"]: "" })
    }
  }

  const handleExitHours = e => {
    const { value } = e.target;
    const vHours = validateHours(value);

  function validateHours(hours) {
    var vHours = /^(?:(?:2[0-3]|1\d|[1-9])(?:\.\d+)?|24(?:\.0+)?)$/;
    return vHours.test(String(hours));
  }

    if (!vHours && value !== "") {
      console.log('Hours is here')
      setForm({ ...form, ["errorHours"]: true, ["helperTextHours"]: "You can book chargers only within 24 hours" })
    } else if (value === "") {
      setForm({ ...form, ["errorHours"]: true, ["helperTextHours"]: "Hours is empty" })
    } else {
      setForm({ ...form, ["errorHours"]: false, ["helperTextHours"]: "" })
    }
  }

  const totalPriceMessage = () => {
    console.log(typeof props.pin.costPerKWh)
    console.log(typeof props.pin.hours)
    const cost = props.pin.costPerKWh * form.hours
    console.log('TOTAL PRICE = ' + cost)
    setForm({ ...form, ['totalPrice']: cost })
  }

  const Div = styled.div`
  color: red;
  background-color: #F7F8F9;
  height: 30px
  `;

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Book
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Book</DialogTitle>
        <IconButton aria-label="Close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>        
        <DialogContent>
          <DialogContentText>
            Select the date and amount of hours you wish to book.
          </DialogContentText>
          <ThemeProvider theme={theme}>
          <TextField
            margin="dense"
            id="date"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            focused={true}
            error={form.errorDate}
            helperText={form.helperTextDate}
            value={form.date}
            onChange={handleInputChange}
            onBlur={handleExitDate}
          />
          <TextField
            margin="dense"
            id="hours"
            label="Hours"
            type="hours"
            fullWidth
            error={form.errorHours}
            helperText={form.helperTextHours}
            value={form.hours}
            onChange={handleInputChange}
            onBlur={handleExitHours && totalPriceMessage}
          />
          <div>
            <h4>This is the total price of your charge:</h4>
          </div>
          <Div> 
           <h3>${form.totalPrice.toLocaleString('en-CA')}</h3>
          </Div>
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
        <ThemeProvider theme={theme}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePostData} color="primary">
            Book
          </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}