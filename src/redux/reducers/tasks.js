const initialState = [];

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return [...action.payload];
    case 'REMOVE_ALL_TASKS':
      return [...initialState];
    case 'ADD_TASK':
      return [...state, { ...action.payload }];
    default:
      return [...state];
  }
};

export default tasksReducer;
