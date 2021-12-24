const initialState = { msg: '', open: false };

const snackReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_SNACK':
      return { ...action.payload, open: true };
    case 'CLOSE_SNACK':
      return { ...initialState };
    default:
      return { ...state };
  }
};

export default snackReducer;
