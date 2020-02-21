import React from "react";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import DialogeTableBookings from "./components/DialogeTableBookings";
import AddChargerDialog from "./components/AddChargerDialog";
import DialogeTableChargers from "./components/DialogeTableChargers";
import DialogeMyAccount from "./components/DialogeMyAccount";
import DialogeLogin from "./components/DialogeLogin";
import DialogeSignUp from "./components/DialogeSignUp";

export default function App() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [openDialoge, setOpenDialoge] = React.useState(false);
  const toggleDialoge = () => {
    setOpenDialoge(!openDialoge);
  };

  const [openAddCharger, setOpenAddCharger] = React.useState(false);
  const toggleAddCharger = () => {
    setOpenAddCharger(!openAddCharger);
  };

  const [openMyChargers, setOpenMyChargers] = React.useState(false);
  const toggleMyChargers = () => {
    setOpenMyChargers(!openMyChargers);
  };

  const [openMyAccount, setOpenMyAccount] = React.useState(false);
  const toggleMyAccount = () => {
    setOpenMyAccount(!openMyAccount);
  };

  const [openLogin, setOpenLogin] = React.useState(false);
  const toggleLogin = () => {
    setOpenLogin(!openLogin);
  };

  const [openSignUp, setOpenSignUp] = React.useState(false);
  const toggleSignUp = () => {
    setOpenSignUp(!openSignUp);
  };

  const handleClose = () => {
    setOpenDialoge(false);
    setOpenAddCharger(false);
    setOpenMyChargers(false);
    setOpenMyAccount(false);
    setOpenLogin(false);
    setOpenSignUp(false);
  };

  return (
  <div>
    <Navbar 
      open={open} 
      myBookingsClick={toggleDialoge} 
      addChargerClick={toggleAddCharger} 
      myChargersClick={toggleMyChargers} 
      myAccountClick={toggleMyAccount}
      loginClick={toggleLogin}
      signUpClick={toggleSignUp}
    />
    <DialogeTableBookings open={openDialoge} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    <AddChargerDialog open={openAddCharger} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    <DialogeTableChargers open={openMyChargers} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    <DialogeMyAccount open={openMyAccount} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    <DialogeLogin open={openLogin} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    <DialogeSignUp open={openSignUp} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    <Map />
  </div>
  )
}
