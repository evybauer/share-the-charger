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

  // /([a-z0-9])+$/i -- Empty

  // INPUT VALIDATION

    const handleExitEmail = e => {
      const { id, value } = e.target;
      const em = validateEmail(value);

      console.log(em)
      console.log(id)

      function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
  
      if (id === 'email' && !em) {
        console.log('it is here')
        setForm({ ...form, ["errorEmail"]: true, ["helperTextEmail"]: "Invalid e-mail address" })
      } else {
        setForm({ ...form, ["errorEmail"]: false, ["helperTextEmail"]: "" })
      }
    }

    const handleExitPassword = e => {
      const { id, value } = e.target;
      const pw = validatePassword(value);

      function validatePassword(password) {
        var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(String(password).toLowerCase());
      }
  
      if (id === 'password' && !pw) {
        console.log('it is here')
        setForm({ ...form, ["errorPassword"]: true, ["helperTextPassword"]: "Password must be 8 characters or longer, at least one letter and one number" })
      } else {
        setForm({ ...form, ["errorPassword"]: false, ["helperTextPassword"]: "" })
      }
    }
  
    const handleExitFirstName = e => {
      const { id, value } = e.target;
      const fn = validateFirstName(value);

    function validateFirstName(firstName) {
      var characteres = /[a-zA-Z]/;
      return characteres.test(String(firstName));
    }

     if (id === 'firstName' && !fn) {
        console.log('First Name it is here')
        setForm({ ...form, ["errorFirstName"]: true, ["helperTextFirstName"]: "Empty field or numbers are not allowed on name" })
      } else {
        setForm({ ...form, ["errorFirstName"]: false, ["helperTextFirstName"]: "" })
      }
    }

    const handleExitLastName = e => {
      const { id, value } = e.target;
      const ln = validateLastName(value);

    function validateLastName(LastName) {
      var characteres = /[a-zA-Z]/;
      return characteres.test(String(LastName));
    }

     if (id === 'lastName' && !ln) {
        console.log('Last Name it is here')
        setForm({ ...form, ["errorLastName"]: true, ["helperTextLastName"]: "Empty field or numbers are not allowed on name" })
      } else {
        setForm({ ...form, ["errorLastName"]: false, ["helperTextLastName"]: "" })
      }
    }

    const handleExitPhoneNumber = e => {
      const { id, value } = e.target;
      const pn = validatePhoneNumber(value);

    function validatePhoneNumber(creditCardCvv) {
      var pn = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
      return pn.test(String(creditCardCvv));
    }

      if (id === 'phoneNumber' && !pn) {
        // console.log('Phone Number is here')
        setForm({ ...form, ["errorPhoneNumber"]: true, ["helperTextPhoneNumber"]: "Invalid Phone Number" })
      } else {
        setForm({ ...form, ["errorPhoneNumber"]: false, ["helperTextPhoneNumber"]: "" })
      }

    }
    
    const handleExitCreditCardNumber = e => {
      const { id, value } = e.target;
      const cc = validateCreditCardNumber(value);

    function validateCreditCardNumber(creditCardNumber) {
      var cc = /^.{6,}$/;
      return cc.test(String(creditCardNumber));
    }

      if (id === 'creditCardNumber' && !cc) {
        console.log('First Name it is here')
        setForm({ ...form, ["errorCreditCardNumber"]: true, ["helperTextCreditCardNumber"]: "Invalid Credit Card Number" })
      } else {
        setForm({ ...form, ["errorCreditCardNumber"]: false, ["helperTextCreditCardNumber"]: "" })
      }
    }

    const handleExitCreditCardExpirationDate = e => {
      const { id, value } = e.target;
      const cced = validateCreditCardExpirationDate(value);

    function validateCreditCardExpirationDate(creditCardExpirationDate) {
      var cced = /^((0[1-9])|(1[0-2]))\/((2009)|(20[1-2][0-9]))$/;
      return cced.test(String(creditCardExpirationDate));
    }

      if (id === 'creditCardExpirationDate' && !cced) {
        console.log('Credit Card Expiration Date is here')
        setForm({ ...form, ["errorCreditCardExpirationDate"]: true, ["helperTextCreditCardExpirationDate"]: "Credit Card Expiration Date invalid" })
      } else {
        setForm({ ...form, ["errorCreditCardExpirationDate"]: false, ["helperTextCreditCardExpirationDate"]: "" })
      }
    }

    const handleExitCreditCardCvv = e => {
      const { id, value } = e.target;

      const cvv = validateCreditCardCvv(value);
    function validateCreditCardCvv(creditCardCvv) {
      var cvv = /^[0-9]{3,4}$/;
      return cvv.test(String(creditCardCvv));
    }

      if (id === 'creditCardCvv' && !cvv) {
        console.log('Credit Card Cvv is here')
        setForm({ ...form, ["errorCreditCardCvv"]: true, ["helperTextCreditCardCvv"]: "Incorrect CVV" })
      } else {
        setForm({ ...form, ["errorCreditCardCvv"]: false, ["helperTextCreditCardCvv"]: "" })
      }

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
            required
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            error={form.errorFirstName}
            helperText={form.helperTextFirstName}
            // helperText={form.firstName === "" ? "Empty field!' : ' '}  
            value={form.firstName}
            onChange={handleInputChange}
            onBlur={handleExitFirstName}
          />
          <TextField
            margin="dense"
            required
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            error={form.errorLastName}
            helperText={form.helperTextLastName}
            value={form.lastName}
            onChange={handleInputChange}
            onBlur={handleExitLastName}
          />
          <TextField
            margin="dense"
            required
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            fullWidth
            // error={form.error}
            // helperText={form.helperText}
            value={form.dateOfBirth}
            onChange={handleInputChange}
            // onBlur={handleExit}
          />
          <TextField
            margin="dense"
            required
            id="phoneNumber"
            label="Phone Number"
            type="number"
            fullWidth
            error={form.errorPhoneNumber}
            helperText={form.helperTextPhoneNumber}
            value={form.phoneNumber}
            onChange={handleInputChange}
            onBlur={handleExitPhoneNumber}
          />
          <TextField
            margin="dense"
            required
            id="email"
            label="Email"
            type="email"
            fullWidth
            error={form.errorEmail}
            helperText={form.helperTextEmail}
            value={form.email}
            onChange={handleInputChange}
            onBlur={handleExitEmail}
          />
          <TextField
            margin="dense"
            required
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
          <TextField
            margin="dense"
            required
            id="creditCardNumber"
            label="Credit Card Number"
            type="number"
            fullWidth
            error={form.errorCreditCardNumber}
            helperText={form.helperTextCreditCardNumber}
            value={form.creditCardNumber}
            onChange={handleInputChange}
            onBlur={handleExitCreditCardNumber}
          />
          <TextField
            margin="dense"
            required
            id="creditCardExpirationDate"
            label="Credit Card Expiration Date"
            type="month"
            fullWidth
            error={form.errorCreditCardExpirationDate}
            helperText={form.helperTextCreditCardExpirationDate}
            value={form.creditCardExpirationDate}
            onChange={handleInputChange}
            onBlur={handleExitCreditCardExpirationDate}
          />
          <TextField
            margin="dense"
            required
            id="creditCardCvv"
            label="Credit Card CVV"
            type="number"
            fullWidth
            error={form.errorCreditCardCvv}
            helperText={form.helperTextCreditCardCvv}
            value={form.creditCardCvv}
            onChange={handleInputChange}
            onBlur={handleExitCreditCardCvv}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePostData(props.handleClose)} color="primary">
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