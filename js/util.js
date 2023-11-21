function isEscapeKey({ key }) {
  return key === 'Escape';
}

function getRandomArrayItem(items) {
  const randomIndex = generateRandomPositiveInteger(0, items.length - 1);

  return items[randomIndex];
}
function generateRandomPositiveInteger(min, max) {
  const lower = Math.floor(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.ceil(Math.max(Math.abs(min), Math.abs(max)));
  const randomValue = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(randomValue);
}

function debounce(cb, timeoutDelay = 500) {
  let timeoutId;

  return (...params) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, params), timeoutDelay);
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

export {
  isEscapeKey,
  getRandomArrayItem,
  debounce,
};
