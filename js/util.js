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

export {getRandomPositiveInteger, getRandomPositiveFloat, getArrayRandomElement, getArrayRandomElements,
  translateItem, numWord, infoCheck};
