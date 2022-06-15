const TITLE_VALUE = 'Большой, светлый пентхаус в центре Токио';
const PRICE_UPPER_LIMIT = 100000;
const TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const ROOMS_UPPER_LIMIT = 20;
const GUESTS_UPPER_LIMIT = 3;
const CHECK_TIME_ARRAY = ['12:00', '13:00', '14:00'];
const FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION_VALUE = 'Предлагается шикарный пентхаус площадью 450 квадратных метров на 15 этаже жилого комплекса «Okinawa House».';
const PHOTOS_ARRAY = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const ADVERTS_ARRAY_LENGTH = 10;

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

//Функция, создающая объект объявления
const createObject = (item, index) => {
  const author = {
    avatar: `img/avatars/user${index >= 10 ? index : `0${index}`}.png`,
  };

  const location = {
    lat : getRandomPositiveFloat(35.65, 35.7, 5),
    lng : getRandomPositiveFloat(139.7, 139.8, 5),
  };

  const offer = {
    title: TITLE_VALUE,
    address: `${location.lat}, ${location.lng}`,
    price: getRandomPositiveInteger(0, PRICE_UPPER_LIMIT),
    type: getArrayRandomElement(TYPE_ARRAY),
    rooms: getRandomPositiveInteger(0, ROOMS_UPPER_LIMIT),
    guests: getRandomPositiveInteger(0, GUESTS_UPPER_LIMIT),
    checkin: getArrayRandomElement(CHECK_TIME_ARRAY),
    checkout: getArrayRandomElement(CHECK_TIME_ARRAY),
    features: getArrayRandomElements(FEATURES_ARRAY),
    description: DESCRIPTION_VALUE,
    photos: getArrayRandomElements(PHOTOS_ARRAY),
  };

  return {
    author,
    offer,
    location,
  };
};

const createAdvertsArray = Array.from({length: ADVERTS_ARRAY_LENGTH}, createObject);

console.log(createAdvertsArray);
