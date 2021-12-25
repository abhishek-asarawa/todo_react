import { findIndex } from 'lodash';

const initialState = [];

const addTask2Board = (task, boards) => {
  const boardId = task.board;
  const index = findIndex(
    boards,
    (board) => board.id.toString() === boardId.toString()
  );

  if (index === -1) return [...boards];

  let board = boards[index];
  board = {
    ...board,
    tasks: board.tasks ? [...board.tasks, { ...task }] : [{ ...task }],
    tasksAgg: board.tasksAgg
      ? {
          ...board.tasksAgg,
          total: board.tasksAgg.total + 1,
          pending: board.tasksAgg.pending + 1
        }
      : { completed: 0, total: 1, pending: 1 }
  };
  boards.splice(index, 1, board);
  return [...boards];
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BOARDS':
      return [...action.payload];
    case 'REMOVE_ALL_BOARDS':
      return [...initialState];
    case 'ADD_BOARD':
      return [...state, { ...action.payload }];
    case 'ADD_TASK':
      return addTask2Board(action.payload, state);
    default:
      return [...state];
  }
};

export default boardsReducer;
