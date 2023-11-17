import { getPhotoById } from './photo-previews.js';
import { setUpModal } from './modal.js';

const RECEIVED_COMMENTS_INCREASE_COUNT = 5;

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
const bigPictureModal = setUpModal({
  modalElement: pictureModalElement,
  closeModalElement: closePictureModalElement,
});

let receivedCommentsCount = 0;
let shownCommentsCount = 0;
let allComments = [];

function updateShownCommentCountText() {
  shownCommentCountElement.textContent = shownCommentsCount;
}

function isShownAllComments() {
  return shownCommentsCount === allComments.length;
}

function createCommentElement({ avatar, name, message }) {
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
}

function renderComments() {
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
}

function renderBigPicture({ url, likes, comments, description }) {
  allComments = comments;
  shownCommentsCount = 0;
  receivedCommentsCount = 0;

  imageElement.src = url;
  likesElement.textContent = likes;
  socialCaptionElement.textContent = description;

  commentCountElement.classList.add('hidden');
  loadCommentsButton.classList.add('hidden');
  totalCommentCountElement.textContent = comments.length.toString();
  commentsContainerElement.append(renderComments());
  updateShownCommentCountText();

  if (allComments.length) {
    commentCountElement.classList.remove('hidden');
  }

  if (!isShownAllComments()) {
    loadCommentsButton.classList.remove('hidden');
  }
}

function onLoadCommentsClick(evt) {
  evt.preventDefault();

  commentsContainerElement.append(renderComments());
  updateShownCommentCountText();

  if (isShownAllComments()) {
    loadCommentsButton.classList.add('hidden');
  }
}

function setPicturesContainerClick(picturesContainerElement, photos) {
  picturesContainerElement.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');

    if (pictureElement) {
      evt.preventDefault();
      const pictureId = Number.parseInt(pictureElement.dataset.pictureId, 10);

      renderBigPicture(getPhotoById(photos, pictureId));
      bigPictureModal.show();
    }
  });
}

loadCommentsButton.addEventListener('click', onLoadCommentsClick);

export { setPicturesContainerClick };
