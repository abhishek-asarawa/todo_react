export const setBoards = (boards) => {
  return {
    type: 'SET_BOARDS',
    payload: [...boards]
  };
};

export const addBoard = (board) => {
  return { type: 'ADD_BOARD', payload: { ...board } };
};
