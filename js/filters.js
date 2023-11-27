import { getRandomArrayItem } from './util.js';

const BUTTON_CLASS_SELECTOR = '.img-filters__button';
const BUTTON_ACTIVE_CLASS_NAME = 'img-filters__button--active';
const MAX_RANDOM_ITEMS_COUNT = 10;
const filtersElement = document.querySelector('.img-filters');
const filtersButtons = filtersElement.querySelectorAll(BUTTON_CLASS_SELECTOR);
const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const comparePhotosByCommentCount = (photoA, photoB) => {
  const commentsCountA = photoA.comments.length;
  const commentsCountB = photoB.comments.length;

  return commentsCountB - commentsCountA;
};

const filterByDefault = (data) => data.slice();

const filterByRandom = (data) => {
  const items = [];

  for (let i = 0; i < MAX_RANDOM_ITEMS_COUNT; i++) {
    let randomItem = getRandomArrayItem(data);

    while (items.includes(randomItem)) {
      randomItem = getRandomArrayItem(data);
    }

    items.push(randomItem);
  }

  return items;
};

const filterByCommentsCount = (data) => data.slice().sort(comparePhotosByCommentCount);

const filterFunctions = {
  [FilterType.DEFAULT]: filterByDefault,
  [FilterType.RANDOM]: filterByRandom,
  [FilterType.DISCUSSED]: filterByCommentsCount,
};

let currentFilterType = FilterType.DEFAULT;

const updateActiveFilterButtons = (activeButton) => {
  filtersButtons.forEach((button) => button.classList.remove(BUTTON_ACTIVE_CLASS_NAME));
  activeButton.classList.add(BUTTON_ACTIVE_CLASS_NAME);
};

const rerender = (evt, data, cb) => {
  const filterButtonElement = evt.target.closest(BUTTON_CLASS_SELECTOR);

  if (!filterButtonElement) {
    return;
  }

  evt.preventDefault();

  const filterType = filterButtonElement.id;

  if (currentFilterType === filterType) {
    return;
  }

  currentFilterType = filterType;

  updateActiveFilterButtons(filterButtonElement);
  cb(filterFunctions[currentFilterType](data));
};

const showFilters = () => {
  filtersElement.classList.remove('img-filters--inactive');
};

const setFiltersClick = (data, cb) => {
  filtersElement.addEventListener('click', (evt) => {
    rerender(evt, data, cb);
  });
};

export {
  showFilters,
  setFiltersClick,
};
