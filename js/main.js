import { createPhotoPreviews } from './photo-previews.js';
import { onPicturesContainerClick } from './photo-modal.js';

const picturesContainerElement = document.querySelector('.pictures');

picturesContainerElement.append(createPhotoPreviews());
picturesContainerElement.addEventListener('click', onPicturesContainerClick);
