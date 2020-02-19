import React from "react";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import AddButton from "./components/AddButton";
import DialogeTableBookings from "./components/DialogeTableBookings";

export default function App() {

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [openDialoge, setOpenDialoge] = React.useState(false);
  const toggleDialoge = () => {
    console.log(openDialoge)
    setOpenDialoge(!openDialoge);
  };

  const handleClose = () => {
    setOpenDialoge(false);
  };

  return (
  <div>
    <Navbar open={open} myBookingsClick={toggleDialoge} />
    <DialogeTableBookings open={openDialoge} handleClickOpen={handleClickOpen} handleClose={handleClose} />
  
    <Map />
    <AddButton />
  </div>
  )
}
