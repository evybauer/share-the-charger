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
    guestId: "5e48e5635376001a00f75fa3",
    date: props.date,
    hours: props.hours,
    totalPrice: 10
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
      })
      .catch(function (error) {
        console.log(error);
      });
    };

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
            label=""
            type="date"
            fullWidth
            value={form.date}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="hours"
            label=""
            type="hours"
            fullWidth
            value={form.hours}
            onChange={handleInputChange}
          />
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
