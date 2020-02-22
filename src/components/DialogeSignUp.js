import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function DialogeSignUp(props) {

  const [form, setForm] = useState({
    email: props.email,
    password: props.password,
    firstName: props.firstName,
    lastName: props.lastName,
    dateOfBirth: props.dateOfBirth,
    phoneNumber: props.phoneNumber,
    creditCardNumber: props.creditCardNumber,
    creditCardExpirationDate: props.creditCardExpirationDate,
    creditCardCvv: props.creditCardCvv
  });

  const handleInputChange = e => {
    const { id, value } = e.target;
    setForm({...form, [id]: value});
    console.log('This is my form', form);

  }

  const handlePostData = () => {
    console.log(form);
    const body = JSON.stringify(form);
    const url = "http://localhost:8080/user/signup";

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
    }

  return (
    <div>
      <Dialog
        open={props.open} 
        onClose={props.handleClose} 
        aria-labelledby="form-dialog-title"
      > 
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sign up and start sharing.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={form.firstName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={form.lastName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            fullWidth
            value={form.dateOfBirth}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="phoneNumber"
            label="Phone Number"
            type="number"
            fullWidth
            value={form.phoneNumber}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={form.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="creditCardNumber"
            label="Credit Card Number"
            type="number"
            fullWidth
            value={form.creditCardNumber}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="creditCardExpirationDate"
            label="Credit Card Expiration Date"
            type="month"
            fullWidth
            value={form.creditCardExpirationDate}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="creditCardCvv"
            label="Credit Card CVV"
            type="number"
            fullWidth
            value={form.creditCardCvv}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePostData} color="primary">
            Sign Up
          </Button>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}