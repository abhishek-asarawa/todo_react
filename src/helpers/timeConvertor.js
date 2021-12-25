let options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};

const timeConvertor = (ms, format = options) => {
  return new Date(ms).toLocaleString('en-US', format);
};

export default timeConvertor;
