/*
function getRandomRange(min, max) {
  if (min === max || min < 0 || max < 0) {
    return 'Error';
  }
  if (min > max) {
    return (Math.random() * (min - max) + max).toFixed(0);
  }
  return (Math.random() * (max - min) + min).toFixed(0);
}

getRandomRange(1, 2);

function getRandomFromRange(min, max, decimalDigit) {
  if (min === max || min < 0 || max < 0 || decimalDigit < 0) {
    return 'Error';
  }
  if (min > max) {
    return (Math.random() * (min - max) + max).toFixed(decimalDigit);
  }
  return (Math.random() * (max - min) + min).toFixed(decimalDigit);
}

getRandomFromRange(1, 10, 3);
*/

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

const titleValue = 'Большой, светлый пентхаус в центре Токио';
const priceUpperLimit = 100000;
const typeArray = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const roomsUpperLimit = 20;
const guestsUpperLimit = 3;
const checkTimeArray = ['12:00', '13:00', '14:00'];
const featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptionValue = 'Предлагается шикарный пентхаус площадью 450 квадратных метров на 15 этаже жилого комплекса «Okinawa House».';
const photosArray = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const AdvtsArrayLength = 10;

//Функция, возвращающая случайное значение из массива
function arrayRandomElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

//Функция, возвращающая несколько случайных значений из массива
function arrayRandomElements (elements) {
  const newArrayRandomElements = elements.slice();
  const getArrayLength = getRandomPositiveInteger(1, newArrayRandomElements.length);
  for (let i = 0; i < getArrayLength; i++) {
    newArrayRandomElements.splice(i, getRandomPositiveInteger(i, getArrayLength - 1));
  }
  return newArrayRandomElements;
}

//Создание массива из адресов изображений
const avatarAdressArray = [];
for (let i = 1; i <= AdvtsArrayLength; i++) {
  avatarAdressArray.push(`img/avatars/user${i === 10 ? i : `0${i}`}.png`);
}

//Функция, перемешивающая массив из адресов изображений
function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const avatarShuffledAdressArray = shuffle(avatarAdressArray);

//Функция, создающая объект объявления
const createObject = () => {
  const AUTHOR = {
    avatar : '',
  };

  const latValue = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const lngValue = getRandomPositiveFloat(139.70000, 139.80000, 5);
  const LOCATION = {
    lat : latValue,
    lng : lngValue,
  };

  const OFFER = {
    title: titleValue,
    address: LOCATION,
    price: getRandomPositiveInteger(0, priceUpperLimit),
    type: arrayRandomElement(typeArray),
    rooms: getRandomPositiveInteger(0, roomsUpperLimit),
    guests: getRandomPositiveInteger(0, guestsUpperLimit),
    checkin: arrayRandomElement(checkTimeArray),
    checkout: arrayRandomElement(checkTimeArray),
    features: arrayRandomElements (featuresArray),
    description: descriptionValue,
    photos: arrayRandomElements (photosArray),
  };
  return {
    AUTHOR,
    OFFER,
    LOCATION,
  };
};

const createAdvtsArray = Array.from({length: AdvtsArrayLength}, createObject);

//Присвоение адресов изображений объектам из перемашанного массива
for (let i = 0; i < avatarShuffledAdressArray.length; i++) {
  createAdvtsArray[i].AUTHOR.avatar = avatarShuffledAdressArray[i];
}
