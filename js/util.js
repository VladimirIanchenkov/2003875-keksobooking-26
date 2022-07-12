//Функция, возвращающая случайное целое число из переданного диапазона включительно:
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно:
function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

//Функция, возвращающая случайное значение из массива
function getArrayRandomElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

//Функция, возвращающая несколько случайных значений из массива
function getArrayRandomElements (elements) {
  const newArrayRandomElements = [];
  for (let i = 0; i < elements.length; i++) {
    if (getRandomPositiveInteger(0, 1)) {
      newArrayRandomElements.push(elements[i]);
    }
  }
  return newArrayRandomElements;
}

//Функция-переводчик элементов
function translateItem (item) {
  if (item === 'flat'){
    item = 'Квартира';
  } else if (item === 'bungalow') {
    item = 'Бунгало';
  } else if (item === 'house') {
    item = 'Дом';
  } else if (item === 'palace') {
    item = 'Дворец';
  } else if (item === 'hotel') {
    item = 'Отель';
  }
  return item;
}

//Функция склонения по числам
function numWord (value, words){
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) {
    return words[2];
  }
  if (num > 1 && num < 5) {
    return words[1];
  }
  if (num === 1) {
    return words[0];
  }
  return words[2];
}

//Функция проверки пустого содержимого
function infoCheck (item) {
  if (item.textContent === '') {
    item.classList.add('hidden');
  }
}

function onEscapeKeydown (item) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      item.remove();
    }
  });
}

function onScreenClick (item) {
  window.addEventListener('click', (evt) => {
    if (!item.contains(evt.target) || item.contains(evt.target)) {
      item.remove();
    }
  });
}


// Функция отрисовки сообщения об успешной отправке
const showSuccess = () => {
  const succeessMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const messageItem = succeessMessageTemplate.cloneNode(true);
  document.body.append(messageItem);
  onEscapeKeydown(messageItem);
  onScreenClick(messageItem);
};

// Функция отрисовки сообщения об ошибке
const showAlert = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const messageItem = errorMessageTemplate.cloneNode(true);
  document.body.append(messageItem);
  onEscapeKeydown(messageItem);
  const errorButton = messageItem.querySelector('.error__button');
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    messageItem.remove();
  });
  onScreenClick(messageItem);
};

// Вывод оошибки загрузки с сервера
const showServerAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#ffffff';
  alertContainer.style.backgroundColor = '#ff5635';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
function debounce (callback, RENDER_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), RENDER_DELAY);
  };
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle
function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {getRandomPositiveInteger, getRandomPositiveFloat, getArrayRandomElement, getArrayRandomElements,
  translateItem, numWord, infoCheck, showAlert, showSuccess, showServerAlert, debounce, throttle};
