export const setTasks = (tasks) => {
  return {
    type: 'SET_TASKS',
    payload: [...tasks]
  };
};

export const addTask = (task) => {
  return { type: 'ADD_TASK', payload: { ...task } };
};
