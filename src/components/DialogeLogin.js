import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles'; 
import styled from 'styled-components';

import clsx from 'clsx';
import Input from '@material-ui/core/Input';
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
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit / 2,
    top: theme.spacing.unit / 2,
    color: theme.palette.grey[900],
  },
}));

export default function DialogeLogin(props) {

  const classes = useStyles();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = e => {
    const { id, value } = e.target;
    setForm({...form, [id]: value});
    console.log('This is my form', form);

  }

  const handlePostData = () => {
    console.log(form);
    const body = JSON.stringify(form);
    const url = "http://localhost:8080/user/login";

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
        formCopy.id = res.data._id
        formCopy.firstName = res.data.firstName
        formCopy.lastName = res.data.lastName
        formCopy.dateOfBirth = res.data.dateOfBirth
        formCopy.phoneNumber = res.data.phoneNumber
        formCopy.creditCardNumber = res.data.creditCardNumber
        formCopy.creditCardExpirationDate = res.data.creditCardExpirationDate
        formCopy.creditCardCvv = res.data.creditCardCvv
        setForm({})
        props.setUserState(formCopy)
        props.handleClose();
      })
      .catch(function (error) {
        setForm({...form, ['response']: true})
        console.log(error);
      });
    };

    // INPUT VALIDATION

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

    function ResponseBackend() {
      if (form.response) {
        return <h3> Invalid email or password </h3>
      } else {
        return null
      }
    } 

    const Div = styled.div`
    text-align: center;
    color: #e53935;
    font-family: Arial, Helvetica, sans-serif;
    `;
  
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
     >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <IconButton aria-label="Close" className={classes.closeButton} onClick={props.handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText >
            Welcome back! <br/> Please, login first to start sharing and charging. 
            </DialogContentText>
            <ThemeProvider theme={theme}>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
            error={form.errorEmail}
            helperText={form.helperTextEmail}
            value={form.email}
            onChange={handleInputChange}
            onBlur={handleExitEmail}
          />
          </ThemeProvider>
          <br />
          <br />
          <div className={classes.root}>
        <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            margin="dense"
            id="password"
            label="Password"
            type={values.showPassword ? 'text' : 'password'}
            fullWidth
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
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
       </div>
        </DialogContent>
        <Div>
        <ResponseBackend />
        </Div>
        <br />
        <br />
        <DialogActions>
        <ThemeProvider theme={theme}>
        <Button onClick={props.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={handlePostData} color="primary">
              Login
          </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}