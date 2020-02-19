import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      {
        title: 'Charger Address',
        field: 'street',
        lookup: { 34: 'Vancouver', 63: 'BC' },
      },
      { title: 'Date', field: 'date' },
      { title: 'Time', field: 'time' },
      { title: 'Total Price', field: 'totalPrice'},
    ],
    data: [
      { date: '2020-02-25', time: '08.00', totalPrice: 20},
      {
        date: '2020-02-20',
        time: '09.00',
        totalPrice: 10,
      },
    ],
  });

  return (
    <MaterialTable
      title="Bookings history"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
