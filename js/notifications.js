import { isEscapeKey } from './util.js';

const NOTIFICATION_SHOW_TIME_IN_MS = 5000;

const successNotificationTemplate = document.querySelector('#success').content.querySelector('.success');
const errorNotificationTemplate = document.querySelector('#error').content.querySelector('.error');
const errorDataNotificationTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

let notificationElement = null;

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (!notificationElement) {
      return;
    }

    notificationElement.remove();
  }
});

function createSuccessNotification() {
  notificationElement = successNotificationTemplate.cloneNode(true);
  notificationElement.addEventListener('click', (evt) => {
    if (!evt.target.matches('.success, .success__button')) {
      return;
    }

    evt.preventDefault();
    notificationElement.remove();
  });

  return notificationElement;
}

function createErrorNotification() {
  notificationElement = errorNotificationTemplate.cloneNode(true);
  notificationElement.addEventListener('click', (evt) => {
    if (!evt.target.matches('.error, .error__button')) {
      return;
    }

    evt.preventDefault();
    notificationElement.remove();
  }, { once: true });

  return notificationElement;
}

function createErrorDataNotification() {
  notificationElement = errorDataNotificationTemplate.cloneNode(true);

  return notificationElement;
}

function showSuccessUploadNotification() {
  document.body.append(createSuccessNotification());
}

function showErrorUploadNotification() {
  document.body.append(createErrorNotification());
}

function showErrorDataNotification() {
  document.body.append(createErrorDataNotification());

  setTimeout(() => {
    notificationElement.remove();
  }, NOTIFICATION_SHOW_TIME_IN_MS);
}

export {
  showSuccessUploadNotification,
  showErrorUploadNotification,
  showErrorDataNotification,
};
