const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function createPreview({ id, url, description, likes, comments }) {
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
}

function createPreviews(photos) {
  const picturesFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    picturesFragment.append(createPreview(photo));
  });

  return picturesFragment;
}

function renderPreviews(photos) {
  removePreviews();
  picturesContainerElement.append(createPreviews(photos));
}

function removePreviews() {
  let pictureElements = picturesContainerElement.querySelectorAll('.picture');

  for (const pictureElement of pictureElements) {
    pictureElement.remove();
  }

  pictureElements = null;
}

function getPhotoById(photos, photoId) {
  return photos.find(({ id }) => id === photoId);
}

export {
  renderPreviews,
  getPhotoById,
};
