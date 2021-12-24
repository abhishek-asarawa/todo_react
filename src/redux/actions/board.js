export const setBoards = (boards) => {
  return {
    type: 'SET_BOARDS',
    payload: [...boards]
  };
};
