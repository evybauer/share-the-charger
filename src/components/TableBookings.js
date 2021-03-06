import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function MaterialTableDemo(props) {

  const columns = [
    // { title: 'Charger Address', field: 'street' },
    { title: 'Date', field: 'date', type: 'date' },
    { title: 'Charger Name', field: 'chargerTitle' },
    { title: 'Address', field: 'chargerStreet' },
    { title: 'City', field: 'chargerCity' },
    { title: 'Province', field: 'chargerStateOrProvince' },
    { title: 'Postal Code', field: 'chargerPostCode' },
    { title: 'Country', field: 'chargerCountryID' },
    { title: 'Hours Booked', field: 'hours' },
    { title: 'Total Price', field: 'TotalPriceWithCurrency' },
  ]

    const [state, setState] = React.useState([
      { 
      //   street: '401 West Georgia', 
      //   date: '2020-02-20', 
      //   time: '11.00',
      //   totalPrice: 15},
      // {
      //   street: '311 Howe', 
      //   date: '2020-10-03',
      //   time: '09.00',
      //   totalPrice: 10,
      },
    ],
  );

  useEffect(() => {
    const url = "http://localhost:8080/reservations/byGuest/" + props.userState.id;

    axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      let getReservation = res.data.reservation
      console.log(getReservation) //array of dictionaries
      const ma = getReservation.map(({ _id, guestId, __v, ...date }) => {
        const reservationTotalPrice = date.totalPrice
        const TotalPriceWithCurrency = '$' + reservationTotalPrice
        date.TotalPriceWithCurrency = TotalPriceWithCurrency

        const chargerTitle = date.chargerId.title
        date.chargerTitle = chargerTitle

        const chargerStreet = date.chargerId.street
        date.chargerStreet = chargerStreet

        const chargerCity = date.chargerId.city
        date.chargerCity = chargerCity

        const chargerStateOrProvince = date.chargerId.stateOrProvince
        date.chargerStateOrProvince = chargerStateOrProvince

        const chargerPostCode = date.chargerId.postCode
        date.chargerPostCode = chargerPostCode

        const chargerCountryID = date.chargerId.countryId
        date.chargerCountryID = chargerCountryID

        delete date.chargerId
        return date
      })

        setState(ma)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  return (
    <MaterialTable
      title="Bookings history"
      columns={columns}
      data={state}
      icons={tableIcons}
      options={{
        headerStyle: {
          color: '#000000',
          fontSize: '14px',
          textAlign: 'left',
          fontWeight: '700',
          backgroundColor: '#d8f7ec'
        }
      }}
      // editable={{
      //   onRowDelete: oldData =>
      //     new Promise(resolve => {
      //       setTimeout(() => {
      //         resolve();
      //         setState(prevState => {
      //           const data = [...prevState];
      //           data.splice(data.indexOf(oldData), 1);
      //           return { ...prevState, data };
      //         });
      //       }, 600);
      //     }),
      // }}
    />
  );
}
