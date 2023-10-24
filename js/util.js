const getId = () => {
  let id = 0;
  return () => ++id;
};

const generateRandomPositiveInteger = (min, max) => {
  const lower = Math.floor(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.ceil(Math.max(Math.abs(min), Math.abs(max)));
  const randomValue = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(randomValue);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousIds = [];

  return () => {
    if (previousIds.length >= max - min + 1) {
      return null;
    }

    let currentId = generateRandomPositiveInteger(min, max);

    while (previousIds.includes(currentId)) {
      currentId = generateRandomPositiveInteger(min, max);
    }

    previousIds.push(currentId);

    return currentId;
  };
};

const getRandomArrayItem = (items) => {
  const randomIndex = generateRandomPositiveInteger(0, items.length - 1);

  return items[randomIndex];
};

export {
  getId,
  generateRandomPositiveInteger,
  createRandomIdFromRangeGenerator,
  getRandomArrayItem,
};
