import { setUpModal } from './modal.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInputElement = document.querySelector('.img-upload__input');
const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
const closeUploadOverlayElement = imageUploadOverlayElement.querySelector('.img-upload__cancel');

const imageUploadModal = setUpModal({
  modalElement: imageUploadOverlayElement,
  closeModalElement: closeUploadOverlayElement,
  onHideModal: resetForm,
});

function resetForm() {
  imageUploadForm.reset();
}

imageUploadInputElement.addEventListener('change', () => {
  imageUploadModal.show();
});
