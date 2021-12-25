const initialState = [];

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BOARDS':
      return [...action.payload];
    case 'REMOVE_ALL_BOARDS':
      return [...initialState];
    case 'ADD_BOARD':
      return [...state, { ...action.payload }];
    default:
      return [...state];
  }
};

export default boardsReducer;
