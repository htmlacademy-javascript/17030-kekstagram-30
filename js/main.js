import { getPhotos } from './api.js';
import { showErrorDataNotification, showSuccessUploadNotification } from './notifications.js';
import { renderPreviews } from './photo-previews.js';
import { setPicturesContainerClick } from './photo-modal.js';
import { setImageUploadFormSubmit, setAcceptAttributeToUploadFileElement } from './upload-image-form.js';
import { setFiltersClick, showFilters } from './filters.js';
import { debounce } from './util.js';

getPhotos(
  () => showErrorDataNotification(),
  (photos) => {
    const picturesContainerElement = document.querySelector('.pictures');

    showFilters();
    setFiltersClick(photos, debounce(renderPreviews));
    setPicturesContainerClick(picturesContainerElement, photos);
  });

setAcceptAttributeToUploadFileElement();
setImageUploadFormSubmit(showSuccessUploadNotification);
