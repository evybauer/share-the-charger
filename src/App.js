import React from "react";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import DialogeTableBookings from "./components/DialogeTableBookings";
import AddChargerDialog from "./components/AddChargerDialog";
import DialogeTableChargers from "./components/DialogeTableChargers";
import DialogeMyAccount from "./components/DialogeMyAccount";

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

  const handleClose = () => {
    setOpenDialoge(false);
    setOpenAddCharger(false);
    setOpenMyChargers(false);
    setOpenMyAccount(false);
  };

  return (
  <div>
    <Navbar open={open} myBookingsClick={toggleDialoge} addChargerClick={toggleAddCharger} myChargersClick={toggleMyChargers} myAccountClick={toggleMyAccount}/>
    <DialogeTableBookings open={openDialoge} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    <AddChargerDialog open={openAddCharger} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    <DialogeTableChargers open={openMyChargers} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    <DialogeMyAccount open={openMyAccount} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    <Map />
  </div>
  )
}
