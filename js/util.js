const isEscapeKey = ({ key }) => key === 'Escape';

function debounce(cb, timeoutDelay) {
  let timeoutId;

  return (...params) => {
    clearTimeout(timeoutId);
    setTimeout(() => cb.apply(this, params), timeoutDelay);
  };
}

function throttle(cb, delayBetweenFrames) {
  let lastTime = 0;

  return (...params) => {
    const now = Date.now();

    if (now - lastTime >= delayBetweenFrames) {
      cb.apply(this, params);
      lastTime = now;
    }
  };
}

export { isEscapeKey };
