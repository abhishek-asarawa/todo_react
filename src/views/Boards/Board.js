import axios from 'axios';
import isArray from 'lodash/isArray';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from '../../redux/actions/board';
import { openSnack } from '../../redux/actions/snack';
import BoardTable from './components/Table';
import Toolbar from './components/Toolbar';

const endpoint = `${process.env.REACT_APP_URL}/boards?task-aggregates=required`;

const columns = [
  [
    { id: 'title', textAlign: 'left', name: 'Board Name' },
    { id: 'createdAt', textAlign: 'left', name: 'Created On' }
  ],
  [
    { id: 'tasks.completed', textAlign: 'center', name: 'Completed' },
    { id: 'tasks.pending', textAlign: 'center', name: 'Pending' },
    { id: 'tasks.total', textAlign: 'center', name: 'Total' }
  ]
];

const Boards = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boardsReducer);

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

  return (
    <div>
      <Toolbar />
      <BoardTable columns={columns} rows={boards} />
    </div>
  );
};

export default Boards;
