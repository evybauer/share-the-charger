import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 340,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Dropdown() {
  const classes = useStyles();
  const [minutes, setMinutes] = React.useState('');

  // ==== Getting an error when I have one of the input fields
  // ==== When I comment this out it works
  // const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const handleChange = event => {
    setMinutes(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
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
        </Select>
      </FormControl>
    </div>
  );
}