const INITIAL_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const imageUploadForm = document.querySelector('.img-upload__form');
const previewImageElement = imageUploadForm.querySelector('.img-upload__preview img');
const scaleDownButtonElement = imageUploadForm.querySelector('.scale__control--smaller');
const scaleUpButtonElement = imageUploadForm.querySelector('.scale__control--bigger');
const scaleValueElement = imageUploadForm.querySelector('.scale__control--value');

const setScaleValue = (scaleValue) => {
  scaleValueElement.value = `${ scaleValue }%`;
  previewImageElement.style.transform = `scale(${ (scaleValue) / 100 })`;
};

const resetScaleValue = () => {
  setScaleValue(INITIAL_SCALE_VALUE);
};

scaleDownButtonElement.addEventListener('click', () => {
  const currentScaleValue = Number.parseInt(scaleValueElement.value, 10);
  const nextScaleValue = currentScaleValue - SCALE_STEP;
  const scaleValue = Math.max(nextScaleValue, MIN_SCALE_VALUE);

  setScaleValue(scaleValue);
});

scaleUpButtonElement.addEventListener('click', () => {
  const currentScaleValue = Number.parseInt(scaleValueElement.value, 10);
  const nextScaleValue = currentScaleValue + SCALE_STEP;
  const scaleValue = Math.min(nextScaleValue, MAX_SCALE_VALUE);

  setScaleValue(scaleValue);
});

export { resetScaleValue };
