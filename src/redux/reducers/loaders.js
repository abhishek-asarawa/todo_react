const initialState = {};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_LOADER':
      return { ...state, [action.payload]: true };
    case 'STOP_LOADER':
      return { ...state, [action.payload]: false };
    default:
      return { ...state };
  }
};

export default loaderReducer;
