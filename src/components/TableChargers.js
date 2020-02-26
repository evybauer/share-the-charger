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
    { title: 'Title', field: 'title' },
    { title: 'Cost per KWh', field: 'costPerChargePriceCurrency' },
    { title: 'Number of Chargers', field: 'numberOfChargers' },
    { title: 'Connection Type ID', field: 'connectionTypeName' },
    { title: 'Street', field: 'street' },
    { title: 'City', field: 'city' },
    { title: 'Province or State', field: 'stateOrProvince' },
    { title: 'Country', field: 'countryId' },
    { title: 'Start Date', field: 'dateAvailableStart', type: 'date' },
    { title: 'End Date', field: 'dateAvailableEnd', type: 'date' },
    { title: 'General Comments', field: 'generalComments' },
    // { title: 'Latitude', field: 'latitude' },
    // { title: 'Longitude', field: 'longitude' },
    // { title: 'Type of Charger', field: 'typeOfCharger' },
    // { title: 'Active', field: 'active' },
    // { title: 'Start Hour', field: 'hourStart' },
    // { title: 'End Hour', field: 'hourEnd' },
  ]
  
    const [state, setState] = React.useState([
      {
        // title: 'Charger Ruby',
        // // costPerKWh: 20,
        // // numberOfChargers: 1,
        // // street: '401 West Georgia',
        // // city: 'Vancouver',
        // // provinceOrState: 'BC',
        // // country: 'CA',
        // // latitude: 49.281290,
        // // longitude: -123.114670,
        // // generalComments: 'Lightly used.',
        // // typeOfCharger: 'J1772',
        // // active: true,
        // // dateAvailableStart: '2020-02-20',
        // // dateAvailableEnd: '2050-02-20',
        // // hourStart: 8,
        // // hourEnd: 15,
        // // connectionTypeId: 1
      },
    ],
  );

  useEffect(() => {
    console.log("THIS IS MY STATE OF USERSTATE ON CHARGERS")
    console.log(props.userState)
    const url = "http://localhost:8080/chargers/byOwner/" + props.userState.id;

    axios
    .get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      let getCharger = res.data.charger
      console.log(getCharger) //array of dictionaries

      const ma = getCharger.map(({ _id, ownerId, __v, ...title }) => {
        const connectionTypeName = title.connectionTypeId.title
        title.connectionTypeName = connectionTypeName
        const costPerChargePrice = title.costPerKWh
        const costPerChargePriceCurrency = "$" + costPerChargePrice
        title.costPerChargePriceCurrency = costPerChargePriceCurrency
        delete title.connectionTypeId
        return title
      })
      console.log(ma)

        setState(ma)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])



  return (
    <MaterialTable
      title="Chargers List"
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