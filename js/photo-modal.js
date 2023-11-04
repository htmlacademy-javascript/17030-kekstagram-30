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

const RECEIVED_COMMENTS_INCREASE_COUNT = 5;
let receivedCommentsCount = 0;
let shownCommentsCount = 0;
let allComments = [];

const updateShownCommentCountText = () => {
  shownCommentCountElement.textContent = shownCommentsCount;
};

const isShownAllComments = () => shownCommentsCount === allComments.length;

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

const renderComments = () => {
  const commentsFragment = document.createDocumentFragment();
  commentsContainerElement.innerHTML = '';

  for (shownCommentsCount = 0; shownCommentsCount < allComments.length; shownCommentsCount++) {
    if (shownCommentsCount >= receivedCommentsCount + RECEIVED_COMMENTS_INCREASE_COUNT) {
      break;
    }

    commentsFragment.append(createCommentElement(allComments[shownCommentsCount]));
  }

  receivedCommentsCount = receivedCommentsCount + RECEIVED_COMMENTS_INCREASE_COUNT;

  return commentsFragment;
};

const renderBigPicture = ({ url, likes, comments, description }) => {
  allComments = comments;
  shownCommentsCount = 0;
  receivedCommentsCount = 0;

  imageElement.src = url;
  likesElement.textContent = likes;

  totalCommentCountElement.textContent = comments.length.toString();
  commentsContainerElement.append(renderComments());
  updateShownCommentCountText();

  if (isShownAllComments()) {
    loadCommentsButton.classList.add('hidden');
  } else {
    loadCommentsButton.classList.remove('hidden');
  }

  socialCaptionElement.textContent = description;
};

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const onLoadCommentsClick = (evt) => {
  evt.preventDefault();

  commentsContainerElement.append(renderComments());
  updateShownCommentCountText();

  if (isShownAllComments()) {
    loadCommentsButton.classList.add('hidden');
  }
};

const onPicturesContainerClick = (evt) => {
  const pictureElement = evt.target.closest('.picture');

  if (pictureElement) {
    evt.preventDefault();
    const pictureId = Number.parseInt(pictureElement.dataset.pictureId, 10);

    renderBigPicture(getPhotoById(pictureId));
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

loadCommentsButton.addEventListener('click', onLoadCommentsClick);
closePictureModalElement.addEventListener('click', () => {
  closePhotoModal();
});

export { onPicturesContainerClick };
