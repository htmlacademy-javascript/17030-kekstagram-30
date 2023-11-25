import { setUpModal } from './modal.js';
import { isEscapeKey } from './util.js';
import { resetScaleValue } from './scaling-image.js';
import { init as initEffects, resetEffect, setEffectPreviewsBackgroundImageStyle } from './effects.js';
import { sendPhoto } from './api.js';
import { showErrorUploadNotification } from './notifications.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_COUNT = 140;
const ALLOWED_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadPreviewElement = imageUploadForm.querySelector('.img-upload__preview img');
const initialUploadImageUrl = imageUploadPreviewElement.src;
const imageUploadFileElement = imageUploadForm.querySelector('.img-upload__input');
const hashTagsInputElement = imageUploadForm.querySelector('[name="hashtags"]');
const descriptionInputElement = imageUploadForm.querySelector('[name="description"]');
const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
const closeUploadOverlayElement = imageUploadOverlayElement.querySelector('.img-upload__cancel');
const imageUploadSubmitButtonElement = imageUploadForm.querySelector('.img-upload__submit');
const imageUploadModal = setUpModal({
  modalElement: imageUploadOverlayElement,
  closeModalElement: closeUploadOverlayElement,
  onShowModalCb: initEffects,
  onHideModalCb: resetForm,
});

const pristineImageUploadForm = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
}, false);

pristineImageUploadForm.addValidator(hashTagsInputElement, validateHashtags, 'введён невалидный хэш-тег', 1);
pristineImageUploadForm.addValidator(hashTagsInputElement, validateHashtagsCount, 'превышено количество хэш-тегов', 2);
pristineImageUploadForm.addValidator(hashTagsInputElement, validateUniqHashtags, 'хэш-теги повторяются', 3);
pristineImageUploadForm.addValidator(descriptionInputElement, validateDescriptionMaxLength, 'длина комментария не может составлять больше 140 символов', 4);

function setImageUploadFormSubmit(onSuccess) {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValidForm = pristineImageUploadForm.validate();

    if (!isValidForm) {
      return;
    }

    disableUploadSubmitButton();

    sendPhoto(
      showErrorUploadNotification,
      () => {
        imageUploadModal.hide();
        onSuccess();
      },
      new FormData(evt.target))
      .finally(enableUploadSubmitButton);
  });
}

imageUploadFileElement.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  if (!checkFileExtension(fileName)) {
    return;
  }

  setSelectedImageUrl(file);
  imageUploadModal.show();
});

hashTagsInputElement.addEventListener('keydown', onKeyDownOnFormInputs);
descriptionInputElement.addEventListener('keydown', onKeyDownOnFormInputs);

function disableUploadSubmitButton() {
  imageUploadSubmitButtonElement.disabled = true;
}

function enableUploadSubmitButton() {
  imageUploadSubmitButtonElement.disabled = false;
}

function convertToHashtagsArray(value) {
  return value.trim().split(/\s+/);
}

function validateHashtags(value) {
  const hashtags = convertToHashtagsArray(value);

  return hashtags.every((hashtag) => {
    if (hashtag === '') {
      return true;
    }

    return /^#[0-9a-zа-яё]{1,19}$/i.test(hashtag);
  });
}

function validateHashtagsCount(value) {
  const hashtags = convertToHashtagsArray(value);

  return hashtags.length <= MAX_HASHTAGS_COUNT;
}

function validateUniqHashtags(value) {
  const hashtags = convertToHashtagsArray(value);

  return hashtags.length === new Set(hashtags.map((hashtag) => hashtag.toLowerCase())).size;
}

function validateDescriptionMaxLength(value) {
  return value.length <= MAX_DESCRIPTION_COUNT;
}

function resetForm() {
  imageUploadFileElement.value = null;
  hashTagsInputElement.value = '';
  descriptionInputElement.value = '';
  pristineImageUploadForm.reset();
  resetScaleValue();
  resetEffect();
  resetSelectedImageUrl();
}

function setSelectedImageUrl(imageFile) {
  const imageUrl = URL.createObjectURL(imageFile);
  imageUploadPreviewElement.src = imageUrl;
  setEffectPreviewsBackgroundImageStyle(imageUrl);
}

function resetSelectedImageUrl() {
  URL.revokeObjectURL(imageUploadPreviewElement.src);
  imageUploadPreviewElement.src = initialUploadImageUrl;
  setEffectPreviewsBackgroundImageStyle();
}

function checkFileExtension(fileName) {
  return ALLOWED_FILE_EXTENSIONS.some((it) => fileName.endsWith(it));
}

function setAcceptAttributeToUploadFileElement() {
  imageUploadFileElement.accept = ALLOWED_FILE_EXTENSIONS.join(',');
}

function onKeyDownOnFormInputs(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

export {
  setImageUploadFormSubmit,
  setAcceptAttributeToUploadFileElement,
};
