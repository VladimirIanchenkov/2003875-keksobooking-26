import {getRandomPositiveInteger} from './util.js';
import {getRandomPositiveFloat} from './util.js';
import {getArrayRandomElement} from './util.js';
import {getArrayRandomElements} from './util.js';

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

//Функция, создающая объект объявления
const createObject = (item, index) => {
  const author = {
    avatar: `img/avatars/user${index + 1 >= 10 ? index + 1 : `0${index + 1}`}.png`,
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

const createAdverts = (count) => Array.from({length: count}, createObject);

export {createAdverts};
