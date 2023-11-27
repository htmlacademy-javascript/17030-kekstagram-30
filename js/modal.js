import { isEscapeKey } from './util.js';
import { isNotificationShown } from './notifications.js';

const TOGGLE_MODAL_CLASS_NAME = 'hidden';
const SHOWN_MODAL_BODY_CLASS_NAME = 'modal-open';

const setUpModal = ({ modalElement, closeModalElement, onShowModalCb, onHideModalCb }) => {
  const show = () => {
    modalElement.classList.remove(TOGGLE_MODAL_CLASS_NAME);
    document.body.classList.add(SHOWN_MODAL_BODY_CLASS_NAME);

    document.addEventListener('keydown', onDocumentKeyDown);

    if (typeof onShowModalCb === 'function') {
      onShowModalCb();
    }
  };

  function hide() {
    modalElement.classList.add(TOGGLE_MODAL_CLASS_NAME);
    document.body.classList.remove(SHOWN_MODAL_BODY_CLASS_NAME);

    document.removeEventListener('keydown', onDocumentKeyDown);

    if (typeof onHideModalCb === 'function') {
      onHideModalCb();
    }
  }

  function onDocumentKeyDown(evt) {
    if (isNotificationShown()) {
      return;
    }

    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hide();
    }
  }

  closeModalElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    hide();
  });

  return {
    show,
    hide,
  };
};

export { setUpModal };
