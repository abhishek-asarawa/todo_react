import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { useSnackbar } from 'react-simple-snackbar';

import './App.css';

import Navigation from './Navigation';
import { closeSnack } from './redux/actions/snack';

const options = {
  style: {
    backgroundColor: '#142F43',
    border: '2px solid lightgreen',
    color: 'lightblue',
    fontFamily: 'Menlo, monospace',
    fontSize: '20px',
    textAlign: 'center'
  }
};

function App() {
  const dispatch = useDispatch();

  const snackState = useSelector((state) => state.snackReducer);

  const openSnackBar = useSnackbar(options)[0];

  useEffect(() => {
    if (snackState.open) {
      openSnackBar(snackState.msg, 5 * 1000);
      dispatch(closeSnack());
    }
    //eslint-disable-next-line
  }, [snackState]);

  return (
    <Container style={{ width: '100%' }}>
      <Navigation />
    </Container>
  );
}

export default App;
