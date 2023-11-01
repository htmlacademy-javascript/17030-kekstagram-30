import { createRandomIdFromRangeGenerator, generateRandomPositiveInteger, getId, getRandomArrayItem } from './util.js';

const DESCRIPTIONS = [
  'Запечатленная красота природы: река, лес и горы на обзоре.',
  'Морская романтика: закат, песок и волны, сливающиеся воедино.',
  'Улочка в старом городе: историческая архитектура, цветочные горшки, тесные переулочки.',
  'Сияние городской жизни: небоскребы, мигающие огни, потоки автомобилей.',
  'Заколдованный лес: туман, покрытые мхом деревья и множество птичьих голосов.',
  'Момент взлета: самолет, облака и захватывающее ощущение свободы.',
  'Фестиваль цветов: море ярких оттенков, люди, держащие в руках букеты.',
  'Тихая зимняя красота: снежные сопки, обнаженные деревья и чистый воздух.',
  'Магия горы: вершина, покрытая снегом, освещена звездами и луной.',
  'Футбольная страсть: роскошный стадион, азартные фанаты и спортивные звезды.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Александр',
  'Екатерина',
  'Максим',
  'Анна',
  'Иван',
  'Мария',
  'Дмитрий',
  'Ольга',
  'Николай',
  'Юлия',
];

const PUBLISHED_PHOTOS_COUNT = 25;
const MAX_COMMENTS_COUNT = 30;

const createRandomPhotoId = createRandomIdFromRangeGenerator(1, PUBLISHED_PHOTOS_COUNT);
const createRandomPhotoUrlId = createRandomIdFromRangeGenerator(1, PUBLISHED_PHOTOS_COUNT);
const generateCommentId = getId();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ generateRandomPositiveInteger(1, 6) }.svg`,
  message: getRandomArrayItem(MESSAGES),
  name: getRandomArrayItem(NAMES),
});

const createPhoto = () => {
  const comments = Array
    .from({ length: generateRandomPositiveInteger(0, MAX_COMMENTS_COUNT) })
    .map(createComment);

  return {
    id: createRandomPhotoId(),
    url: `photos/${ createRandomPhotoUrlId() }.jpg`,
    description: getRandomArrayItem(DESCRIPTIONS),
    likes: generateRandomPositiveInteger(15, 200),
    comments,
  };
};

const createPhotos = () => Array
  .from({ length: PUBLISHED_PHOTOS_COUNT })
  .map(createPhoto);

export { createPhotos };
