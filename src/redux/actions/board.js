export const setBoards = (boards) => {
  return {
    type: 'SET_BOARDS',
    payload: [...boards]
  };
};

export const addBoard = (board) => {
  return { type: 'ADD_BOARD', payload: { ...board } };
};

export const updateBoard = (board) => {
  return { type: 'UPDATE_BOARD', payload: { ...board } };
};

export const deleteBoard = (board) => {
  return { type: 'DELETE_BOARD', payload: { ...board } };
};
