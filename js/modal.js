import { isEscapeKey } from './util.js';

const TOGGLE_MODAL_CLASS_NAME = 'hidden';
const SHOWN_MODAL_BODY_CLASS_NAME = 'modal-open';

function setUpModal({ modalElement, closeModalElement, onHideModal }) {
  closeModalElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    hide();
  });

  function onDocumentKeyDown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hide();
    }
  }

  function show() {
    modalElement.classList.remove(TOGGLE_MODAL_CLASS_NAME);
    document.body.classList.add(SHOWN_MODAL_BODY_CLASS_NAME);

    document.addEventListener('keydown', onDocumentKeyDown);
  }

  function hide() {
    modalElement.classList.add(TOGGLE_MODAL_CLASS_NAME);
    document.body.classList.remove(SHOWN_MODAL_BODY_CLASS_NAME);

    if (typeof onHideModal === 'function') {
      onHideModal();
    }

    document.removeEventListener('keydown', onDocumentKeyDown);
  }

  return {
    show,
    hide,
  };
}

export { setUpModal };
