import {changeWord, showAlert, showSuccess} from './util.js';
import {resetMainPinMarker, createAdvertsBaloons, closeAllPopups} from './map.js';
import {getData, sendData} from './api.js';

const DEFAULT_PRICE_FIELD_VALUE = 1000;
const reservationOption = {
  1: ['1'],
  2 : ['2', '1'],
  3 : ['3', '2', '1'],
  100 : ['0'],
};
const minAccommodationPrice = {
  bungalow : 0,
  flat : 1000,
  hotel : 3000,
  house : 5000,
  palace : 10000,
};
const userForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const roomsField = userForm.querySelector('#room_number');
const guestsField = userForm.querySelector('#capacity');
const priceField = userForm.querySelector('#price');
const timeIn = userForm.querySelector('#timein');
const timeOut = userForm.querySelector('#timeout');
const accomodationTypeSelect = userForm.querySelector('#type');
const submitButton = userForm.querySelector('.ad-form__submit');
const resetButton = userForm.querySelector('.ad-form__reset');
const avatarPreview = userForm.querySelector('.ad-form-header__preview').querySelector('img');
const photoContainer = userForm.querySelector('.ad-form__photo');
const sliderElement = document.querySelector('.ad-form__slider');

const pristine = new Pristine(userForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

// Валидация количества комнат и гостей
function validateReservation () {
  return reservationOption[roomsField.value].includes(guestsField.value);
}

function getReservationErrorMessage () {
  return `Размещение ${guestsField.value} ${changeWord(guestsField.value, ['гостя', 'гостей', 'гостей'])} в ${roomsField.value} ${changeWord(roomsField.value, ['комнате', 'комнатах', 'комнатах'])} невозможно`;
}

pristine.addValidator(guestsField, validateReservation, getReservationErrorMessage);

// Синхронизация времени заезда и выезда
timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

// Реализация слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: priceField.placeholder,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
});

priceField.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions ({
    start: priceField.value
  });
});

// Замена плэйсхолдера
accomodationTypeSelect.addEventListener('change', () => {
  priceField.placeholder = minAccommodationPrice[accomodationTypeSelect.value];
  sliderElement.noUiSlider.updateOptions ({
    start: minAccommodationPrice[accomodationTypeSelect.value]
  });
});

// Валидация минимальной стоимости
function validatePrice (value) {
  return value.length && parseInt(value, 10) >= minAccommodationPrice[accomodationTypeSelect.value];
}

function validatePriceErrorMessage () {
  return `Минимальная цена для данного типа жилья - ${minAccommodationPrice[accomodationTypeSelect.value]} руб.`;
}

pristine.addValidator(priceField, validatePrice, validatePriceErrorMessage);

// Ресет страницы
const resetPage = () => {
  userForm.reset();
  filterForm.reset();
  resetMainPinMarker();
  closeAllPopups();
  getData((cards) => {
    createAdvertsBaloons(cards);
  });
  sliderElement.noUiSlider.set(DEFAULT_PRICE_FIELD_VALUE);
  avatarPreview.src = './img/muffin-grey.svg';
  photoContainer.innerHTML = '';
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});


// Блокировка кнопки опубликовать
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Отправка формы
const setUserFormSubmit = (onSuccess) => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showSuccess();
        },
        () => {
          showAlert();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, resetPage};
