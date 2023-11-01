import { getPhotoById } from './photo-previews.js';
import { isEscapeKey } from './util.js';

const pictureModalElement = document.querySelector('.big-picture');

const imageElement = pictureModalElement.querySelector('.big-picture__img img');
const likesElement = pictureModalElement.querySelector('.likes-count');

const commentCountElement = pictureModalElement.querySelector('.social__comment-count');
const shownCommentCountElement = commentCountElement.querySelector('.social__comment-shown-count');
const totalCommentCountElement = commentCountElement.querySelector('.social__comment-total-count');
const commentsContainerElement = pictureModalElement.querySelector('.social__comments');
const loadCommentsButton = pictureModalElement.querySelector('.comments-loader');

const socialCaptionElement = pictureModalElement.querySelector('.social__caption');
const closePictureModalElement = pictureModalElement.querySelector('.big-picture__cancel');

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = 35;
  avatarElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(avatarElement, textElement);

  return commentElement;
};

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsFragment.append(createCommentElement(comment));
  });

  return commentsFragment;
};

const renderPicture = (photo) => {
  commentCountElement.classList.add('hidden');
  loadCommentsButton.classList.add('hidden');

  imageElement.src = photo.url;
  likesElement.textContent = photo.likes;
  shownCommentCountElement.textContent = '?';
  totalCommentCountElement.textContent = photo.comments.length.toString(10);

  commentsContainerElement.innerHTML = '';
  commentsContainerElement.append(renderComments(photo.comments));
  socialCaptionElement.textContent = photo.description;
};

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const onPicturesContainerClick = (evt) => {
  const pictureElement = evt.target.closest('.picture');

  if (pictureElement) {
    const pictureId = Number.parseInt(pictureElement.dataset.pictureId, 10);

    renderPicture(getPhotoById(pictureId));
    openPhotoModal();
  }
};

function openPhotoModal() {
  pictureModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown);
}

function closePhotoModal() {
  pictureModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
}

closePictureModalElement.addEventListener('click', () => {
  closePhotoModal();
});

export { onPicturesContainerClick };
