import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddChargerDialog(props) {

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Your Charger</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Just type in your address to add your domestic electric vehicle charger to our open source database.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="cost-per-minute"
            label="Cost per minute"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            id="number-of-chargers"
            label="Number of chargers"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            id="street"
            label="Street"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="city"
            label="City"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="province"
            label="Province"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="postal-code"
            label="Postal Code"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="country-id"
            label="Country"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="country-id"
            label="Latitude"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            id="country-id"
            label="Longitude"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            id="comments"
            label="General Comments"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            id="type-of-charger"
            label="Type of Charger"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="active"
            label="Active"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="date-start"
            label="Date Available Start"
            type="date"
            fullWidth
          />
          <TextField
            margin="dense"
            id="date-end"
            label="Date Available End"
            type="date"
            fullWidth
          />
          <TextField
            margin="dense"
            id="hour-start"
            label="HourStart"
            type="time"
            fullWidth
          />
          <TextField
            margin="dense"
            id="hour-end"
            label="HourEnd"
            type="time"
            fullWidth
          />
          <TextField
            margin="dense"
            id="connection-type-id"
            label="Connection Type Id"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
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

