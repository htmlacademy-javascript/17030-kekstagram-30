const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPreview = ({ id, url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImage = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');

  pictureElement.dataset.pictureId = id;
  pictureImage.src = url;
  pictureImage.alt = description;

  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  return pictureElement;
};

const createPreviews = (photos) => {
  const picturesFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    picturesFragment.append(createPreview(photo));
  });

  return picturesFragment;
};

const removePreviews = () => {
  let pictureElements = picturesContainerElement.querySelectorAll('.picture');

  for (const pictureElement of pictureElements) {
    pictureElement.remove();
  }

  pictureElements = null;
};

const renderPreviews = (photos) => {
  removePreviews();
  picturesContainerElement.append(createPreviews(photos));
};

const getPhotoById = (photos, photoId) => photos.find(({ id }) => id === photoId);

export {
  renderPreviews,
  getPhotoById,
};
