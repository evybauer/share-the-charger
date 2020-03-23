import React, { useState } from "react";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import DialogeTableBookings from "../components/DialogeTableBookings";
import AddChargerDialog from "../components/AddChargerDialog";
import DialogeTableChargers from "../components/DialogeTableChargers";
import DialogeMyAccount from "../components/DialogeMyAccount";
import DialogeLogin from "../components/DialogeLogin";
import DialogeSignUp from "../components/DialogeSignUp";

export default function App() {

  const [masterPoint, setMasterPoint] = useState([]);

  const [userState, setUserState] = React.useState({
    isAuthenticated: false
  });

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

  const toggleLogout = () => {
    setUserState({});
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
      userState={userState}
      setUserState={setUserState}
      open={open} 
      myBookingsClick={toggleDialoge} 
      addChargerClick={toggleAddCharger} 
      myChargersClick={toggleMyChargers} 
      myAccountClick={toggleMyAccount}
      logoutClick={toggleLogout}
      loginClick={toggleLogin}
      signUpClick={toggleSignUp}
      masterPoint={masterPoint} //create state of parent component --- instead of child controlling the state, the parent will
      setMasterPoint={setMasterPoint} //create state of parent component --- instead of child controlling the state, the parent will
    />
    <DialogeTableBookings open={openDialoge} handleClickOpen={handleClickOpen} handleClose={handleClose} userState={userState} setUserState={setUserState}/>
    <AddChargerDialog open={openAddCharger} handleClickOpen={handleClickOpen} handleClose={handleClose} userState={userState} setUserState={setUserState} masterPoint={masterPoint} setMasterPoint={setMasterPoint}/>
    <DialogeTableChargers open={openMyChargers} handleClickOpen={handleClickOpen} handleClose={handleClose} userState={userState} setUserState={setUserState}/>
    <DialogeMyAccount open={openMyAccount} handleClickOpen={handleClickOpen} handleClose={handleClose} userState={userState} setUserState={setUserState}/>
    <DialogeLogin open={openLogin} handleClickOpen={handleClickOpen} handleClose={handleClose} userState={userState} setUserState={setUserState}/>
    <DialogeSignUp open={openSignUp} handleClickOpen={handleClickOpen} handleClose={handleClose} userState={userState} setUserState={setUserState}/>
    <Map masterPoint={masterPoint} setMasterPoint={setMasterPoint} userState={userState} setUserState={setUserState}/>
  </div>
  )
}
