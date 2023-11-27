const INITIAL_EFFECT_NAME = 'none';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadPreviewElement = imageUploadForm.querySelector('.img-upload__preview img');
const effectsContainerElement = document.querySelector('.img-upload__effects');
const effectPreviewsElements = effectsContainerElement.querySelectorAll('.effects__preview');
const effectLevelElement = imageUploadForm.querySelector('.img-upload__effect-level');
const effectLevelInputElement = effectLevelElement.querySelector('.effect-level__value');
const effectLevelSliderElement = effectLevelElement.querySelector('.effect-level__slider');
const sliderEffectsSettings = {
  none: {
    range: [0, 1],
    step: 0.1,
  },
  chrome: {
    range: [0, 1],
    step: 0.1,
  },
  sepia: {
    range: [0, 1],
    step: 0.1,
  },
  marvin: {
    range: [0, 100],
    step: 1,
  },
  phobos: {
    range: [0, 3],
    step: 0.1,
  },
  heat: {
    range: [1, 3],
    step: 0.1,
  },
};
const filterEffectsSettings = {
  none: '',
  chrome: {
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    unit: '',
  },
};
let currentEffectName = INITIAL_EFFECT_NAME;

const getFilterEffectSettings = () => filterEffectsSettings[currentEffectName];

const generateFilter = (value) => {
  const { filter, unit } = getFilterEffectSettings();
  return `${ filter }(${ value }${ unit })`;
};

const setFilterEffectForImagePreview = (value) => {
  imageUploadPreviewElement.style.filter = value
    ? generateFilter(value)
    : null;
};

const setFilterValue = (value) => {
  effectLevelInputElement.value = value;
  setFilterEffectForImagePreview(value);
};

const onUpdateEffectLevelSlider = (value) => {
  setFilterValue(value);
};

const generateEffectOptions = ({ range, step }) => ({
  start: range[1],
  connect: 'lower',
  range: {
    min: range[0],
    max: range[1],
  },
  step: step,
  format: {
    to(value) {
      return value;
    },
    from(value) {
      const valueAsNumber = Number.parseFloat(value);

      if (Number.isInteger(valueAsNumber)) {
        return valueAsNumber.toFixed(0);
      }
      return valueAsNumber.toFixed(1);
    },
  },
});

const getSliderEffectSettings = () => sliderEffectsSettings[currentEffectName];

const initEffectLevelSlider = () => {
  noUiSlider.create(effectLevelSliderElement, generateEffectOptions(getSliderEffectSettings()));
  effectLevelSliderElement.noUiSlider.on('update', onUpdateEffectLevelSlider);
};

const showEffectLevelSlider = () => {
  effectLevelElement.classList.remove('hidden');
  effectLevelInputElement.removeAttribute('disabled');
};

const hideEffectLevelSlider = () => {
  effectLevelElement.classList.add('hidden');
  effectLevelInputElement.setAttribute('disabled', 'true');
};

const resetEffect = () => {
  currentEffectName = INITIAL_EFFECT_NAME;
  effectsContainerElement.querySelector(`[name="effect"][value="${ INITIAL_EFFECT_NAME }"]`).checked = true;
  setFilterValue(null);
};

const setEffectPreviewsBackgroundImageStyle = (url) => {
  effectPreviewsElements.forEach((effectPreviewElement) => {
    effectPreviewElement.style = url ? `background-image: url(${ url })` : '';
  });
};

const init = () => {
  hideEffectLevelSlider();
  setFilterValue(null);
};

effectsContainerElement.addEventListener('change', (evt) => {
  currentEffectName = evt.target.value;

  if (currentEffectName === INITIAL_EFFECT_NAME) {
    hideEffectLevelSlider();
    setFilterValue(null);
    return;
  }

  if (!Object.hasOwn(effectLevelSliderElement, 'noUiSlider')) {
    initEffectLevelSlider();
  }

  if (effectLevelElement.classList.contains('hidden')) {
    showEffectLevelSlider();
  }

  effectLevelSliderElement.noUiSlider.updateOptions(generateEffectOptions(getSliderEffectSettings()));
});

export {
  init,
  resetEffect,
  setEffectPreviewsBackgroundImageStyle,
};
