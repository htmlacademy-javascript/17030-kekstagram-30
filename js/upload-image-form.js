import { setUpModal } from './modal.js';
import { isEscapeKey } from './util.js';
import { resetScaleValue } from './scaling-image.js';

const MAX_HASHTAGS_COUNT = 5;

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadFileElement = imageUploadForm.querySelector('.img-upload__input');
const hashTagsInputElement = imageUploadForm.querySelector('[name="hashtags"]');
const descriptionInputElement = imageUploadForm.querySelector('[name="description"]');
const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
const closeUploadOverlayElement = imageUploadOverlayElement.querySelector('.img-upload__cancel');
const imageUploadModal = setUpModal({
  modalElement: imageUploadOverlayElement,
  closeModalElement: closeUploadOverlayElement,
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

imageUploadForm.addEventListener('submit', (evt) => {
  const isValidForm = pristineImageUploadForm.validate();

  if (!isValidForm) {
    evt.preventDefault();
  }
});

imageUploadFileElement.addEventListener('change', () => {
  imageUploadModal.show();
});

hashTagsInputElement.addEventListener('keydown', onKeyDownOnFormInputs);
descriptionInputElement.addEventListener('keydown', onKeyDownOnFormInputs);

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

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];

    for (let j = 0; j < hashtags.length; j++) {
      if (j === i) {
        continue;
      }

      const comparedHashtag = hashtags[j];

      if (hashtag.toLowerCase() === comparedHashtag.toLowerCase()) {
        return false;
      }
    }
  }

  return true;
}

function resetForm() {
  imageUploadForm.reset();
  pristineImageUploadForm.reset();
  resetScaleValue();
}

function onKeyDownOnFormInputs(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}
