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
      { title: 'First Name', field: 'firstName' },
      { title: 'Last Name', field: 'lastName' },
      { title: 'Date of Birth', field: 'dateOfBirth', type: 'date' },
      { title: 'Email', field: 'email', type: 'email' },
      // { title: 'Password', field: 'password', type: 'password' },
      { title: 'Phone Number', field: 'phoneNumber', type: 'numeric' },
      { title: 'Credit Card Number', field: 'creditCardNumber', type: 'numeric' }, 
      { title: 'Credit Card Expiration Date', field: 'creditCardExpirationDate', type: 'date'},
      { title: 'Credit Card CVV', field: 'creditCardCvv', type: 'numeric' },
    ]

    const [state, setState] = React.useState([
      {
        // firstName: 'Zerya', 
        // lastName: 'Betul', 
        // dateOfBirth: 1987-11-13, 
        // email: 'baran@gmail.com', 
        // password: '15Gkl8',
        // phoneNumber: 6042232456,
        // creditCardNumber: 4916151497272522,
        // creditCardExpirationDate: '2023-03-01',
        // creditCardCvv: 411,
      },
    ],
  );

  useEffect(() => {
    const url = "http://localhost:8080/user/" + props.userState.id; //pass user --- remove hardcoded user

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        let getUser = res.data.user
        console.log(getUser) //array of dictionaries
        delete getUser._id;
        console.log(getUser)
        delete getUser.__v;
        console.log(getUser)
        const userList = []
        userList.push(getUser)
        console.log(userList)

        setState(userList)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])




  return (
    <MaterialTable
      title="This is your account information"
      columns={columns}
      data={state}
      icons={tableIcons}
      // editable={{
      //   onRowUpdate: (newData, oldData) =>
      //     new Promise(resolve => {
      //       setTimeout(() => {
      //         resolve();
      //         if (oldData) {
      //           setState(prevState => {
      //             const data = [...prevState];
      //             data[data.indexOf(oldData)] = newData;
      //             return { ...prevState, data };
      //           });
      //         }
      //       }, 600);
      //     }),
      // }}
    />
  );
}