import { createPhotoPreviews } from './photo-previews.js';
import { setPicturesContainerClick } from './photo-modal.js';
import './upload-image-form.js';
import './notifications.js';
import { getData } from './api.js';
import { showErrorDataNotification, showSuccessUploadNotification } from './notifications.js';
import { setImageUploadFormSubmit } from './upload-image-form.js';

const picturesContainerElement = document.querySelector('.pictures');

getData(
  () => showErrorDataNotification(),
  (photos) => {
    picturesContainerElement.append(createPhotoPreviews(photos));
    setPicturesContainerClick(picturesContainerElement, photos);
  });

setImageUploadFormSubmit(showSuccessUploadNotification);
