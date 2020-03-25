import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles'; 
import Divider from '@material-ui/core/Divider';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import TodayIcon from '@material-ui/icons/Today';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import axios from 'axios';

import {
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: amber,
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  margin: {
    margin: theme.spacing(1.5),
  },
  withoutLabel: {
    marginTop: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit / 1,
    top: theme.spacing.unit / 1,
    color: theme.palette.grey[900],
  },
  textField: {
    width: '255ch',
  },
}));

export default function DialogeSignUp(props) {

  const classes = useStyles();

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
    const urlemail = "http://localhost:8080/email/signup";
    const bodyemail = {
      emailTo: form.email
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
        const formCopy = {...form}
        formCopy.isAuthenticated = true
        formCopy.id = res.data.createdUser._id
        setForm({})
        props.setUserState(formCopy)
        props.handleClose()
      })
      .catch(function (error) {
        setForm({...form, ['response']: true})
        console.log(error);
      });

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
  }
  
    

    
  // INPUT VALIDATION

  const handleExitFirstName = e => {
    const { value } = e.target;
    const fn = validateFirstName(value);

  function validateFirstName(firstName) {
    var characteres = /[a-zA-Z]/;
    return characteres.test(String(firstName));
  }

   if (!fn && value !== "") {
      setForm({ ...form, ["errorFirstName"]: true, ["helperTextFirstName"]: "Numbers are not allowed on name" })
    } else if (value === "") {
      setForm({ ...form, ["errorFirstName"]: true, ["helperTextFirstName"]: "First name is empty" })
    } else {
      setForm({ ...form, ["errorFirstName"]: false, ["helperTextFirstName"]: "" })
    }
  }

  const handleExitLastName = e => {
    const { value } = e.target;
    const ln = validateLastName(value);

  function validateLastName(lastName) {
    var characteres = /[a-zA-Z]/;
    return characteres.test(String(lastName));
  }

   if (!ln && value !== "") {
      setForm({ ...form, ["errorLastName"]: true, ["helperTextLastName"]: "Empty field or numbers are not allowed on name" })
    } else if (value === "") {
      setForm({ ...form, ["errorLastName"]: true, ["helperTextLastName"]: "Last name is empty" })
    } else {
      setForm({ ...form, ["errorLastName"]: false, ["helperTextLastName"]: "" })
    }
  }

  const handleExitDateOfBirth = e => {
    const { value } = e.target;
    const db = validateDateOfBirth(value);

  function validateDateOfBirth(dateOfBirth) {
    var characteres = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    return characteres.test(String(dateOfBirth));
  }

   if (!db && value !== "") {
      setForm({ ...form, ["errorDateOfBirth"]: true, ["helperTextDateOfBirth"]: "Date of birth is invalid" })
    } else if (value === "") {
      setForm({ ...form, ["errorDateOfBirth"]: true, ["helperTextDateOfBirth"]: "Date of birth is empty" })
    } else {
      setForm({ ...form, ["errorDateOfBirth"]: false, ["helperTextDateOfBirth"]: "" })
    }
  }



  const handleExitEmail = e => {
    const { value } = e.target;
    const em = validateEmail(value);

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if (!em && value !== "") {
      setForm({ ...form, ["errorEmail"]: true, ["helperTextEmail"]: "Invalid e-mail address" })
    } else if (value === "") {
      setForm({ ...form, ["errorEmail"]: true, ["helperTextEmail"]: "E-mail address is empty" })
    } else {
      setForm({ ...form, ["errorEmail"]: false, ["helperTextEmail"]: "" })
    }
  }

  const handleExitPassword = e => {
    const { value } = e.target;
    const pw = validatePassword(value);

    function validatePassword(password) {
      var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return re.test(String(password).toLowerCase());
    }

    if (!pw && value !== "") {
      setForm({ ...form, ["errorPassword"]: true, ["helperTextPassword"]: "Password cannot contain special characteres (@#!$%ˆ&*), must be 8 characters or longer, at least one letter and one number" })
    } else if (value === "") {
      setForm({ ...form, ["errorPassword"]: true, ["helperTextPassword"]: "Password is empty" })
    } else {
      setForm({ ...form, ["errorPassword"]: false, ["helperTextPassword"]: "" })
    }
  }

  const handleExitPhoneNumber = e => {
    const { value } = e.target;
    const pn = validatePhoneNumber(value);

  function validatePhoneNumber(phoneNumber) {
    var pn = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    return pn.test(String(phoneNumber));
  }

    if (!pn && value !== "") {
      setForm({ ...form, ["errorPhoneNumber"]: true, ["helperTextPhoneNumber"]: "Invalid Phone Number" })
    } else if (value === "") {
      setForm({ ...form, ["errorPhoneNumber"]: true, ["helperTextPhoneNumber"]: "Phone Number is empty" })
    } else {
      setForm({ ...form, ["errorPhoneNumber"]: false, ["helperTextPhoneNumber"]: "" })
    }
  }


  
  const handleExitCreditCardNumber = e => {
    const { value } = e.target;
    const cc = validateCreditCardNumber(value);

  function validateCreditCardNumber(creditCardNumber) {
    var cc = /^.{6,}$/;
    return cc.test(String(creditCardNumber));
  }

    if (!cc && value !== "") {
      setForm({ ...form, ["errorCreditCardNumber"]: true, ["helperTextCreditCardNumber"]: "Invalid Credit Card Number" })
    } else if (value === "") {
      setForm({ ...form, ["errorCreditCardNumber"]: true, ["helperTextCreditCardNumber"]: "Credit Card Number is empty" })
    } else {
      setForm({ ...form, ["errorCreditCardNumber"]: false, ["helperTextCreditCardNumber"]: "" })
    }
  }

  const handleExitCreditCardExpirationDate = e => {
    const { value } = e.target;
  //   const cced = validateCreditCardExpirationDate(value);

  // function validateCreditCardExpirationDate(creditCardExpirationDate) {
  //    var cced = /^((0[1-9])|(1[0-2]))\/((2009)|(20[1-2][0-9]))$/;
  //   return cced.test(String(creditCardExpirationDate));
  //}
  // console.log(value)
  let newCcExpData = new Date(value + "-29");
  console.log(newCcExpData);
  if (value !== "" && newCcExpData < new Date()) {
    setForm({ ...form, ["errorCreditCardExpirationDate"]: true, ["helperTextCreditCardExpirationDate"]: "Credit Card Expiration Date invalid" })
    } else if (value === "") {
      setForm({ ...form, ["errorCreditCardExpirationDate"]: true, ["helperTextCreditCardExpirationDate"]: "Credit Card Cvv is empty" })
    } else {
      setForm({ ...form, ["errorCreditCardExpirationDate"]: false, ["helperTextCreditCardExpirationDate"]: "" })
    }
  }
  

  const handleExitCreditCardCvv = e => {
    const { value } = e.target;

    const cvv = validateCreditCardCvv(value);
  function validateCreditCardCvv(creditCardCvv) {
    var cvv = /^[0-9]{3,4}$/;
    return cvv.test(String(creditCardCvv));
  }

    if (!cvv && value !== "") {
      setForm({ ...form, ["errorCreditCardCvv"]: true, ["helperTextCreditCardCvv"]: "Incorrect CVV" })
    } else if (value === "") {
      setForm({ ...form, ["errorCreditCardCvv"]: true, ["helperTextCreditCardCvv"]: "Credit Card Cvv is empty" })
    } else {
      setForm({ ...form, ["errorCreditCardCvv"]: false, ["helperTextCreditCardCvv"]: "" })
    }

  }


  const Div = styled.div`
  text-align: center;
  color: #e53935;
  `;

  function ResponseBackend() {
    if (form.response) {
      return <h3> This e-mail is already used </h3>
    } else {
      return null
    }
  } 

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <div>
      <Dialog
        open={props.open} 
        onClose={props.handleClose} 
        aria-labelledby="form-dialog-title"
        maxWidth = {'sm'}
      > 
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <IconButton aria-label="Close" className={classes.closeButton} onClick={props.handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText>
            Sign up and start sharing.
          </DialogContentText>
          <Divider />
          <br />
          <ThemeProvider theme={theme}>
          <TextField
            autoFocus
            variant="outlined"
            required
            style = {{width: 250}}
            className={classes.margin}
            id="firstName"
            label="First Name"
            type="text"
            error={form.errorFirstName}
            helperText={form.helperTextFirstName}
            value={form.firstName}
            onChange={handleInputChange}
            onBlur={handleExitFirstName}
          />
          <TextField
            variant="outlined"
            required
            style = {{width: 250}}
            className={classes.margin}
            id="lastName"
            label="Last Name"
            type="text"
            error={form.errorLastName}
            helperText={form.helperTextLastName}
            value={form.lastName}
            onChange={handleInputChange}
            onBlur={handleExitLastName}
          />
          <TextField
            variant="outlined"
            // margin="dense"
            required
            style = {{width: 250}}
            className={classes.margin}
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            error={form.errorDateOfBirth}
            helperText={form.helperTextDateOfBirth}
            value={form.dateOfBirth}
            onChange={handleInputChange}
            onBlur={handleExitDateOfBirth}
          />
          <TextField
            variant="outlined"
            // margin="dense"
            required
            style = {{width: 250}}
            className={classes.margin}
            id="phoneNumber"
            label="Phone Number"
            type="number"
            error={form.errorPhoneNumber}
            helperText={form.helperTextPhoneNumber}
            value={form.phoneNumber}
            onChange={handleInputChange}
            onBlur={handleExitPhoneNumber}
          />
          <TextField 
            variant="outlined"
            // margin="dense"
            required
            style = {{width: 520}}
            className={classes.margin}
            id="email"
            label="Email"
            type="email"
            error={form.errorEmail}
            helperText={form.helperTextEmail}
            value={form.email}
            onChange={handleInputChange}
            onBlur={handleExitEmail}
          />
          <div >
          <FormControl  style = {{width: 520}} className={classes.margin} variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              // style = {{width: 500}}
              // margin="dense"
              required 
              // fullWidth
              // className={classes.margin}         
              id="password"
              // label="Password"
              type={values.showPassword ? 'text' : 'password'}
              error={form.errorPassword}
              helperText={form.helperTextPassword}
              value={form.password}
              onChange={handleInputChange}
              onBlur={handleExitPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={100}
            />
            </FormControl>
          </div>
          <br />
          <InputLabel className={classes.margin}>Credit Card Information</InputLabel> 
          <TextField
            variant="outlined"
            // margin="dense"
            required
            style = {{width: 520}}
            className={classes.margin}
            id="creditCardNumber"
            label="Credit Card Number"
            type="number"
            error={form.errorCreditCardNumber}
            helperText={form.helperTextCreditCardNumber}
            value={form.creditCardNumber}
            onChange={handleInputChange}
            onBlur={handleExitCreditCardNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            // margin="dense"
            required
            style = {{width: 250}}
            className={classes.margin}
            id="creditCardExpirationDate"
            label="Credit Card Expiration Date"
            type="month"
            InputLabelProps={{ shrink: true }}
            error={form.errorCreditCardExpirationDate}
            helperText={form.helperTextCreditCardExpirationDate}
            value={form.creditCardExpirationDate}
            onChange={handleInputChange}
            onBlur={handleExitCreditCardExpirationDate}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TodayIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            // margin="dense"
            required
            style = {{width: 246}}
            className={classes.margin}
            id="creditCardCvv"
            label="Credit Card CVV"
            type="number"
            error={form.errorCreditCardCvv}
            helperText={form.helperTextCreditCardCvv}
            value={form.creditCardCvv}
            onChange={handleInputChange}
            onBlur={handleExitCreditCardCvv}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </ThemeProvider>
        </DialogContent>

        <Div>
        <ResponseBackend />
        </ Div>
        
        <DialogActions style={{ marginRight: 30 }}>
        <ThemeProvider theme={theme}>
          <Button onClick={handlePostData} color="primary">
            Sign Up
          </Button>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}