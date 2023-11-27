const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const Route = {
  SEND_PHOTO: '/',
  GET_PHOTOS: '/data',
};
const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const load = ({ url, method = HttpMethod.GET, body = null, onError, onSuccess }) => fetch(url, {
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

const getPhotos = (onError, onSuccess) => load({
  url: BASE_URL + Route.GET_PHOTOS,
  onError,
  onSuccess,
});

const sendPhoto = (onError, onSuccess, body = null, method = HttpMethod.POST) => load({
  url: BASE_URL + Route.SEND_PHOTO,
  method,
  body,
  onError,
  onSuccess,
});

export {
  getPhotos,
  sendPhoto,
};
