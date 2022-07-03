// Фукнция отключает элементы формы по классу формы (при вызове класс элемента указывается без '.')
function switchToDisabled (classToDisable) {
  const container = document.querySelector(`.${classToDisable}`);
  const elements = container.elements;
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
  container.classList.add(`${classToDisable}--disabled`);
}

switchToDisabled('ad-form');
switchToDisabled('map__filters');

// Фукнция активирует элементы формы по классу формы (при вызове класс элемента указывается без '.')
function switchToEnabled (classToEnable) {
  const container = document.querySelector(`.${classToEnable}`);
  const elements = container.elements;
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
  container.classList.remove(`${classToEnable}--disabled`);
}

switchToEnabled('ad-form');
switchToEnabled('map__filters');

// Валидация формы
// Валидация заголовка объявления
const userForm = document.querySelector('.ad-form');
const pristine = new Pristine(userForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

// Валидация количества комнат и гостей
const roomsField = userForm.querySelector('#room_number');
const guestsField = userForm.querySelector('#capacity');
const reservationOption = {
  '1': ['1'],
  '2' : ['2', '1'],
  '3' : ['3', '2', '1'],
  '100' : ['0'],
};

function validateReservation () {
  return reservationOption[roomsField.value].includes(guestsField.value);
}

function getReservationErrorMessage () {
  return `Размещение ${guestsField.value} ${guestsField.value === '1' ? 'гостя' : 'гостей'} в ${roomsField.value} ${roomsField.value === '1' ? 'комнате' : 'комнатах'} невозможно`;
}

pristine.addValidator(guestsField, validateReservation, getReservationErrorMessage);

userForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

export {switchToDisabled, switchToEnabled};
