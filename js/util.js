const isEscapeKey = ({ key }) => key === 'Escape';

const generateRandomPositiveInteger = (min, max) => {
  const lower = Math.floor(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.ceil(Math.max(Math.abs(min), Math.abs(max)));
  const randomValue = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(randomValue);
};

const getRandomArrayItem = (items) => {
  const randomIndex = generateRandomPositiveInteger(0, items.length - 1);

  return items[randomIndex];
};

const debounce = (cb, timeoutDelay = 500) => {
  let timeoutId;

  return (...params) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, params), timeoutDelay);
  };
};

export {
  isEscapeKey,
  getRandomArrayItem,
  debounce,
};
