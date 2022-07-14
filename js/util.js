//Функция-переводчик элементов
const translateItem = (item) => {
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
};

//Функция склонения по числам
const changeWord = (value, words) => {
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
};

//Функция проверки пустого содержимого
const checkNoContent = (item) => {
  if (item.textContent === '') {
    item.classList.add('hidden');
  }
};

const onEscapeKeydown = (item) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      item.remove();
    }
  });
};

const onScreenClick = (item) => {
  window.addEventListener('click', (evt) => {
    if (!item.contains(evt.target) || item.contains(evt.target)) {
      item.remove();
    }
  });
};


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

export {translateItem, changeWord, checkNoContent, showAlert, showSuccess, showServerAlert, debounce};
