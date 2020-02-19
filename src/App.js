import React from "react";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import AddButton from "./components/AddButton";
import DialogeTableBookings from "./components/DialogeTableBookings";
import AddChargerDialog from "./components/AddChargerDialog";

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

  const handleClose = () => {
    setOpenDialoge(false);
    setOpenAddCharger(false);
  };

  return (
  <div>
    <Navbar open={open} myBookingsClick={toggleDialoge} addChargerClick={toggleAddCharger}/>
    <DialogeTableBookings open={openDialoge} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    <AddChargerDialog open={openAddCharger} handleClickOpen={handleClickOpen} handleClose={handleClose} />
    <Map />
  </div>
  )
}
