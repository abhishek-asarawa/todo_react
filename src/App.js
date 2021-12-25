import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { useSnackbar } from 'react-simple-snackbar';
import isArray from 'lodash/isArray';

import './App.css';

import Navigation from './Navigation';
import { closeSnack, openSnack } from './redux/actions/snack';
import axios from 'axios';
import { setBoards } from './redux/actions/board';

const endpoint = `${process.env.REACT_APP_URL}/boards?task-aggregates=required`;

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

  const fetchBoards = useCallback(async () => {
    try {
      const response = await axios.get(endpoint);

      if (response.status === 200) {
        const { data } = response.data;

        if (isArray(data)) dispatch(setBoards(data));
      }
    } catch (err) {
      console.error(err);
      dispatch(openSnack('Facing error in getting boards.'));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

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
