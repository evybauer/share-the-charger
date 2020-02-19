import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dropdown from './Dropdown';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Book
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add your details to book this charger.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            // label="Date"
            type="date"
            fullWidth
          />
          {/* <TextField
             autoFocus
             margin="dense"
             id="minutes"
             label="Minutes"
             type="minutes"
             fullWidth
          /> */}
          <Dropdown />
           {/* <TextField
             autoFocus
             margin="dense"
             id="totalPrice"
             label="Total Price"
             type="totalPrice"
             fullWidth
          /> */}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
