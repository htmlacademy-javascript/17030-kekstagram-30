import { createPhotoPreviews } from './photo-previews.js';
import { onPicturesContainerClick } from './photo-modal.js';
import './upload-image-form.js';

const picturesContainerElement = document.querySelector('.pictures');

picturesContainerElement.append(createPhotoPreviews());
picturesContainerElement.addEventListener('click', onPicturesContainerClick);
