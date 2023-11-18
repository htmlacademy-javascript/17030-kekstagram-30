const isEscapeKey = ({ key }) => key === 'Escape';

function debounce(cb, timeoutDelay) {
  let timeoutId;

  return (...params) => {
    clearTimeout(timeoutId);
    setTimeout(() => cb.apply(this, params), timeoutDelay);
  };
}

export { isEscapeKey };
