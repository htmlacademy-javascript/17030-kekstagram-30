const BASE_URL = 'https://30.javascript.pages.academy';
const Resource = {
  SEND_PHOTO: '/kekstagram',
  GET_PHOTOS: '/kekstagram/data',
};

function getData(onError, onSuccess) {
  return fetch(BASE_URL + Resource.GET_PHOTOS)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then((data) => onSuccess(data))
    .catch((e) => {
      onError(e);
    });
}

function sendData(onError, onSuccess, body = null, method = 'POST') {
  return fetch(BASE_URL + Resource.SEND_PHOTO, {
    method,
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then((data) => onSuccess(data))
    .catch((e) => onError(e));
}

export {
  getData,
  sendData,
};
