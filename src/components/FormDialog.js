import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Dropdown from './Dropdown';
// import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';


export default function FormDialog(props) {

  console.log('BELOW IS THE PROPS:')
  console.log(props.pin.placeName);
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
    chargerId: "5e4c35cf8f57e712be84e0f8",
    guestId: "5e52d643ff366d01abe73b1f",
    date: props.date,
    hours: props.hours,
    totalPrice: 10,
    placeName: undefined
  })

  const handleInputChange = e => {
    const { id, value } = e.target;
    setForm({...form, [id]: value});
    console.log('This is my form', form);
  }

  const handlePostData = () => {
    console.log(form);
    const body = JSON.stringify(form);
    const url = "http://localhost:8080/reservations";

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
      })
      .catch(function (error) {
        console.log(error);
      });
    };


  // INPUT VALIDATION

    // const handleExitDate = e => {
    //   const { id, value } = e.target;
    //   const vDate = validateDate(value);

    // function validateDate(date) {
    //   var vDate = /^((0[1-9])|(1[0-2]))\/((2009)|(20[1-2][0-9]))$/;
    //   return vDate.test(String(date));
    // }

    //   if (id === 'date' && !vDate) {
    //     console.log('Date is here')
    //     setForm({ ...form, ["errorDate"]: true, ["helperTextDate"]: "Invalid date" })
    //   } else {
    //     setForm({ ...form, ["errorDate"]: false, ["helperTextDate"]: "" })
    //   }
    // }

    // const handleExitHours = e => {
    //   const { id, value } = e.target;
    //   const vHours = validateHours(value);

    // function validateHours(hours) {
    //   var vHours = /([1-9]|1[0-9]|2[0-4])/;
    //   return vHours.test(String(hours));
    // }

    //   if (id === 'hours' && !vHours) {
    //     console.log('Hours is here')
    //     setForm({ ...form, ["errorHours"]: true, ["helperTextHours"]: "You can book chargers only within 24 hours" })
    //   } else {
    //     setForm({ ...form, ["errorHours"]: false, ["helperTextHours"]: "" })
    //   }
    // }



    const totalPriceMessage = () => {
      setForm({...form, ['placeName']: props.pin.placeName})
    }




  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Book
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the date and amount of hours you wish to book.
          </DialogContentText>
          <TextField
            margin="dense"
            id="date"
            label="Date"
            type="date"
            fullWidth
            // error={form.errorDate}
            // helperText={form.helperTextDate}
            value={form.date}
            onChange={handleInputChange}
            // onBlur={handleExitDate}
            onBlur={totalPriceMessage}
          />
          <TextField
            margin="dense"
            id="hours"
            label="Hours"
            type="hours"
            fullWidth
            // error={form.errorHours}
            // helperText={form.helperTextHours}
            value={form.hours}
            onChange={handleInputChange}
            // onBlur={handleExitHours}
          />
          <p> 
            <h4>This is the total price of your charge:</h4> 
            {form.placeName}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePostData} color="primary">
            Book
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
