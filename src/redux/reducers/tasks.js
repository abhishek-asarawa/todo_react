import { filter, findIndex } from 'lodash';

const initialState = [];

const updateTask = (task, state) => {
  const index = findIndex(state, (t) => t.id.toString() === task.id.toString());

  if (index === -1) return [...state];

  state.splice(index, 1, { ...state[index], ...task });
  return [...state];
};

const deleteTask = (task, state) => {
  return filter(state, (t) => t.id.toString() !== task.id.toString());
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return [...action.payload];
    case 'REMOVE_ALL_TASKS':
      return [...initialState];
    case 'ADD_TASK':
      return [...state, { ...action.payload }];
    case 'UPDATE_TASK':
      return updateTask(action.payload, state);
    case 'DELETE_TASK':
      return deleteTask(action.payload, state);
    default:
      return [...state];
  }
};

export default tasksReducer;
