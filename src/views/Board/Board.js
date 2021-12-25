import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { findIndex, has, isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { openSnack } from '../../redux/actions/snack';
import { setTasks } from '../../redux/actions/task';
import Toolbar from './components/Toolbar';

const endpoint = `${process.env.REACT_APP_URL}/board`;

const Board = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boardsReducer);

  const [selectedBoard, setSelectedBoard] = useState({});
  const [notFound, setNotFound] = useState(false);

  const selectedId = params.id;

  const fetchBoardTasks = useCallback(async () => {
    try {
      const response = await axios.get(`${endpoint}/${selectedId}`);

      if (response.status === 200) {
        const { data } = response.data;
        if (has(data, 'tasks')) dispatch(setTasks(data.tasks));
      }
    } catch (err) {
      console.error(err);
      dispatch(openSnack('Facing error in fetching board.'));
    }
    // eslint-disable-next-line
  }, [selectedId]);

  useEffect(() => {
    const index = findIndex(
      boards,
      (board) => board.id.toString() === selectedId.toString()
    );
    if (index === -1) setNotFound(true);
    else {
      setNotFound(false);
      setSelectedBoard({ ...boards[index] });
    }
    // eslint-disable-next-line
  }, [selectedId, boards]);

  useEffect(() => {
    fetchBoardTasks();
  }, [fetchBoardTasks]);

  if (notFound && !isEmpty(boards))
    return (
      <div>
        <h1>{`No Board with id ${selectedId} found`}</h1>
      </div>
    );

  return (
    <div>
      <Toolbar board={selectedBoard} />
      <h1>{`Board ${selectedId}`}</h1>
    </div>
  );
};

export default Board;
