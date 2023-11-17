const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const Route = {
  SEND_PHOTO: '/',
  GET_PHOTOS: '/data',
};
const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

function load({ url, method = HttpMethod.GET, body = null, onSuccess, onError }) {
  return fetch(url, {
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

function getPhotos(onError, onSuccess) {
  return load({
    url: BASE_URL + Route.GET_PHOTOS,
    onError,
    onSuccess,
  });
}

function sendPhoto(onError, onSuccess, body = null, method = HttpMethod.POST) {
  return load({
    url: BASE_URL + Route.SEND_PHOTO,
    method,
    body,
    onError,
    onSuccess,
  });
}

export {
  getPhotos,
  sendPhoto,
};
