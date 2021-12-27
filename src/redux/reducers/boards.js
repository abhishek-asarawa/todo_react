import { findIndex, isEmpty } from 'lodash';

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

const updateTask2Board = (task, boards) => {
  const boardId = task.board;
  const index = findIndex(
    boards,
    (board) => board.id.toString() === boardId.toString()
  );

  if (index === -1) return [...boards];

  let board = boards[index];

  let tasksAgg = board.tasksAgg
    ? { ...board.tasksAgg }
    : { completed: 0, pending: 0, total: 0 };
  if (task.isComplete)
    tasksAgg = {
      ...tasksAgg,
      completed: tasksAgg.completed + 1,
      pending: tasksAgg.pending > 0 ? tasksAgg.pending - 1 : 0
    };
  else
    tasksAgg = {
      ...tasksAgg,
      pending: tasksAgg.pending + 1,
      completed: tasksAgg.completed > 0 ? tasksAgg.completed - 1 : 0
    };

  board = { ...board, tasksAgg };
  boards.splice(index, 1, board);
  return [...boards];
};

const deleteTask2Board = (task, boards) => {
  const boardId = task.board;
  const index = findIndex(
    boards,
    (board) => board.id.toString() === boardId.toString()
  );

  if (index === -1) return [...boards];

  let board = boards[index];

  let tasksAgg = board.tasksAgg;

  if (isEmpty(tasksAgg)) return [...boards];

  if (task.isComplete)
    tasksAgg = {
      ...tasksAgg,
      total: tasksAgg.total > 0 ? tasksAgg.total - 1 : 0,
      completed: tasksAgg.completed > 0 ? tasksAgg.completed - 1 : 0
    };
  else
    tasksAgg = {
      ...tasksAgg,
      total: tasksAgg.total > 0 ? tasksAgg.total - 1 : 0,
      pending: tasksAgg.pending > 0 ? tasksAgg.pending - 1 : 0
    };

  board = { ...board, tasksAgg };
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
    case 'UPDATE_TASK':
      return updateTask2Board(action.payload, state);
    case 'DELETE_TASK':
      return deleteTask2Board(action.payload, state);
    default:
      return [...state];
  }
};

export default boardsReducer;
