export const startLoading = (name) => {
  return { type: 'START_LOADER', payload: name };
};

export const stopLoading = (name) => {
  return { type: 'STOP_LOADER', payload: name };
};
