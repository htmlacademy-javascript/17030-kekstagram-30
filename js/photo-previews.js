import { createPhotos } from './data.js';

const photos = createPhotos();
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const createPreview = ({ url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImage = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');

  pictureImage.src = url;
  pictureImage.alt = description;

  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  return pictureElement;
};

photos.forEach((photo) => {
  picturesFragment.append(createPreview(photo));
});

picturesContainer.append(picturesFragment);
