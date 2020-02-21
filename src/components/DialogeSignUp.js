import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogeSignUp(props) {

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title"> 
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
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            fullWidth
          />
          <TextField
            margin="dense"
            id="phoneNumber"
            label="Phone Number"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
          <TextField
            margin="dense"
            id="creditCardNumber"
            label="Credit Card Number"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            id="creditCardExpirationDate"
            label="Credit Card Expiration Date"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            id="creditCardCvv"
            label="Credit Card CVV"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
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