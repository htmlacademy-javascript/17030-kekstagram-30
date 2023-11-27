import { isEscapeKey } from './util.js';

const NOTIFICATION_SHOW_TIME_IN_MS = 5000;

const successNotificationTemplate = document.querySelector('#success').content.querySelector('.success');
const errorNotificationTemplate = document.querySelector('#error').content.querySelector('.error');
const errorDataNotificationTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

let notificationElement;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideNotificationElement();
  }
};

const createSuccessNotification = () => {
  notificationElement = successNotificationTemplate.cloneNode(true);
  notificationElement.addEventListener('click', (evt) => {
    if (!evt.target.matches('.success, .success__button')) {
      return;
    }

    evt.preventDefault();
    hideNotificationElement();
  });

  return notificationElement;
};

const createErrorNotification = () => {
  notificationElement = errorNotificationTemplate.cloneNode(true);
  notificationElement.addEventListener('click', (evt) => {
    if (!evt.target.matches('.error, .error__button')) {
      return;
    }

    evt.preventDefault();
    hideNotificationElement();
  });

  return notificationElement;
};

const createErrorDataNotification = () => {
  notificationElement = errorDataNotificationTemplate.cloneNode(true);

  return notificationElement;
};

const showSuccessUploadNotification = () => {
  document.body.append(createSuccessNotification());
  document.addEventListener('keydown', onDocumentKeydown);
};

const showErrorUploadNotification = () => {
  document.body.append(createErrorNotification());
  document.addEventListener('keydown', onDocumentKeydown);
};

const showErrorDataNotification = () => {
  document.body.append(createErrorDataNotification());

  setTimeout(() => {
    hideNotificationElement();
  }, NOTIFICATION_SHOW_TIME_IN_MS);
};

function hideNotificationElement() {
  notificationElement.remove();
  notificationElement = null;
  document.removeEventListener('keydown', onDocumentKeydown);
}

const isNotificationShown = () => Boolean(notificationElement);

export {
  showSuccessUploadNotification,
  showErrorUploadNotification,
  showErrorDataNotification,
  isNotificationShown,
};
