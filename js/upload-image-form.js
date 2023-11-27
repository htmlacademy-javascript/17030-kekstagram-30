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
const pristineImageUploadForm = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
}, false);

const resetSelectedImageUrl = () => {
  URL.revokeObjectURL(imageUploadPreviewElement.src);
  imageUploadPreviewElement.src = initialUploadImageUrl;
  setEffectPreviewsBackgroundImageStyle();
};

const resetForm = () => {
  imageUploadFileElement.value = null;
  hashTagsInputElement.value = '';
  descriptionInputElement.value = '';
  pristineImageUploadForm.reset();
  resetScaleValue();
  resetEffect();
  resetSelectedImageUrl();
};

const imageUploadModal = setUpModal({
  modalElement: imageUploadOverlayElement,
  closeModalElement: closeUploadOverlayElement,
  onShowModalCb: initEffects,
  onHideModalCb: resetForm,
});

const convertToHashtagsArray = (value) => value.trim().split(/\s+/);

const validateHashtags = (value) => {
  const hashtags = convertToHashtagsArray(value);

  return hashtags.every((hashtag) => {
    if (hashtag === '') {
      return true;
    }

    return /^#[0-9a-zа-яё]{1,19}$/i.test(hashtag);
  });
};

const validateHashtagsCount = (value) => {
  const hashtags = convertToHashtagsArray(value);

  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

const validateUniqHashtags = (value) => {
  const hashtags = convertToHashtagsArray(value);

  return hashtags.length === new Set(hashtags.map((hashtag) => hashtag.toLowerCase())).size;
};

const validateDescriptionMaxLength = (value) => value.length <= MAX_DESCRIPTION_COUNT;

const disableUploadSubmitButton = () => {
  imageUploadSubmitButtonElement.disabled = true;
};

const enableUploadSubmitButton = () => {
  imageUploadSubmitButtonElement.disabled = false;
};

const setSelectedImageUrl = (imageFile) => {
  const imageUrl = URL.createObjectURL(imageFile);
  imageUploadPreviewElement.src = imageUrl;
  setEffectPreviewsBackgroundImageStyle(imageUrl);
};

const checkFileExtension = (fileName) => ALLOWED_FILE_EXTENSIONS.some((it) => fileName.endsWith(it));

const onFormInputKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const setImageUploadFormSubmit = (onSuccess) => {
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
};

const setAcceptAttributeToUploadFileElement = () => {
  imageUploadFileElement.accept = ALLOWED_FILE_EXTENSIONS.join(',');
};

pristineImageUploadForm.addValidator(hashTagsInputElement, validateHashtags, 'введён невалидный хэш-тег', 1);
pristineImageUploadForm.addValidator(hashTagsInputElement, validateHashtagsCount, 'превышено количество хэш-тегов', 2);
pristineImageUploadForm.addValidator(hashTagsInputElement, validateUniqHashtags, 'хэш-теги повторяются', 3);
pristineImageUploadForm.addValidator(descriptionInputElement, validateDescriptionMaxLength, 'длина комментария не может составлять больше 140 символов', 4);

imageUploadFileElement.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  if (!checkFileExtension(fileName)) {
    return;
  }

  setSelectedImageUrl(file);
  imageUploadModal.show();
});

hashTagsInputElement.addEventListener('keydown', onFormInputKeyDown);
descriptionInputElement.addEventListener('keydown', onFormInputKeyDown);

export {
  setImageUploadFormSubmit,
  setAcceptAttributeToUploadFileElement,
};
