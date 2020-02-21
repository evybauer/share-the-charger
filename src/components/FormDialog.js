import React from 'react';
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

const useStyles = makeStyles(theme => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 340,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FormDialog() {
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
            type="date"
            fullWidth
          />
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-label">Minutes</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={minutes}
              onChange={handleChange}
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
          <Button onClick={handleClose} color="primary">
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
