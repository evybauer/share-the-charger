import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Dropdown from './Dropdown';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
// import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

  formControl: {
    // margin: theme.spacing(1),
    minWidth: 340,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FormDialog(props) {
  const [form, setForm] = useState({
    chargerId: "5e48e5635376001a00f75fa3",
    guestId: "5e48e5635376001a00f75fa3",
    date: "2020-02-21",
    minutes: 60,
    totalPrice: 10
  })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const [minutes, setMinutes] = React.useState('');

  const handleChange = event => {
    setMinutes(event.target.value);
  };

  const handleInputChange = e => {
    const { id, value } = e.target;
    setForm({...form, [id]: value});
    console.log('THIS IS MY FORM', form);

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
            Add your details to book this charger.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            type="date"
            fullWidth
            value={form.date}
          />
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-label">Minutes</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="minutes"
              value={form.minutes}
              onChange={handleChange}
              onChange={handleInputChange}
            >
              <MenuItem value={60}>60</MenuItem>
              <MenuItem value={120}>120</MenuItem>
              <MenuItem value={240}>240</MenuItem>
              <MenuItem value={360}>360</MenuItem>
              <MenuItem value={480}>480</MenuItem>
              <MenuItem value={600}>600</MenuItem>
              <MenuItem value={720}>720</MenuItem>
          </Select>
        </FormControl>
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
