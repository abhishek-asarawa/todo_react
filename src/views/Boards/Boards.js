import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BoardTable from '../../components/Table';
import Toolbar from './components/Toolbar';

const columns = [
  [
    { id: 'title', type: 'string', textAlign: 'left', name: 'Board Name' },
    {
      id: 'createdAt',
      type: 'timestamp',
      textAlign: 'left',
      name: 'Created On'
    }
  ],
  [
    {
      id: 'tasksAgg.completed',
      type: 'number',
      textAlign: 'center',
      name: 'Completed'
    },
    {
      id: 'tasksAgg.pending',
      type: 'number',
      textAlign: 'center',
      name: 'Pending'
    },
    { id: 'tasksAgg.total', type: 'number', textAlign: 'center', name: 'Total' }
  ]
];

const Boards = () => {
  const navigate = useNavigate();
  const boards = useSelector((state) => state.boardsReducer);

  const handleRedirect = (id) => {
    navigate(`/board/${id}`, { replace: true });
  };

  return (
    <div>
      <Toolbar />
      <BoardTable
        columns={columns}
        rowWithClickEvent
        handleClick={handleRedirect}
        rows={boards}
      />
    </div>
  );
};

export default Boards;
