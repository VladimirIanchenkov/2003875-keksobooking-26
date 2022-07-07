import {numWord} from './util.js';

const reservationOption = {
  '1': ['1'],
  '2' : ['2', '1'],
  '3' : ['3', '2', '1'],
  '100' : ['0'],
};
const minAccomodationPrice = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace' : 10000,
};
const userForm = document.querySelector('.ad-form');
const roomsField = userForm.querySelector('#room_number');
const guestsField = userForm.querySelector('#capacity');
const priceField = userForm.querySelector('#price');

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
  return `Размещение ${guestsField.value} ${numWord(guestsField.value, ['гостя', 'гостей', 'гостей'])} в ${roomsField.value} ${numWord(roomsField.value, ['комнате', 'комнатах', 'комнатах'])} невозможно`;
}

pristine.addValidator(guestsField, validateReservation, getReservationErrorMessage);

// Валидация минимальной стоимости
function validatePrice (value) {
  const select = userForm.querySelector('#type');
  return value.length && parseInt(value, 10) >= minAccomodationPrice[select.value];
}

function validatePriceErrorMessage () {
  const select = userForm.querySelector('#type');
  return `Минимальная цена для данного типа жилья - ${minAccomodationPrice[select.value]} руб.`;
}

pristine.addValidator(priceField, validatePrice, validatePriceErrorMessage);

// Синхронизация времени заезда и выезда
const timeIn = userForm.querySelector('#timein');
const timeOut = userForm.querySelector('#timeout');

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

userForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
