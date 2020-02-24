import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function DialogeLogin(props) {

  const [form, setForm] = useState({
    email: props.email,
    password: props.password
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
        props.handleClose();
      })
      .catch(function (error) {
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


  return (
    <div>
      <Dialog 
        open={props.open} 
        onClose={props.handleClose} 
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText >
            Welcome back! <br/> Please, login first to start sharing and charging. 
            </DialogContentText>
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
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            error={form.errorPassword}
            helperText={form.helperTextPassword}
            value={form.password}
            onChange={handleInputChange}
            onBlur={handleExitPassword}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePostData} color="primary">
            Login
          </Button>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}