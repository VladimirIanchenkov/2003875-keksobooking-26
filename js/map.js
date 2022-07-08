import {switchToDisabled, switchToEnabled} from './page-status.js';
import {similarAdverts} from './data.js';
import {translateItem, numWord, infoCheck} from './util.js';

const resetButton = document.querySelector('.ad-form__reset');
const points = similarAdverts;
const filters = document.querySelector('.map__filters');
const housingTypeFilter = filters.querySelector('#housing-type');

switchToDisabled('ad-form');
switchToDisabled('map__filters');

const map = L.map('map-canvas')
  .on('load', () => {
    switchToEnabled('ad-form');
    switchToEnabled('map__filters');
  })
  .setView({
    lat: 35.67898,
    lng: 139.76918,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.67898,
    lng: 139.76918,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const userForm = document.querySelector('.ad-form');
  const addressField = userForm.querySelector('#address');
  addressField.value = `lat: ${evt.target.getLatLng().lat.toFixed(5)}, lng: ${evt.target.getLatLng().lng.toFixed(5)}`;
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.67898,
    lng: 139.76918,
  });

  map.setView({
    lat: 35.67898,
    lng: 139.76918,
  }, 13);
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createCustomPopup = (card) => {
  const cardItemTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupPhotoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
  //Клонирование шаблона
  const cardItem = cardItemTemplate.cloneNode(true);
  cardItem.querySelector('.popup__title').textContent = card.offer.title;
  cardItem.querySelector('.popup__text--address').textContent = card.offer.address;
  cardItem.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  cardItem.querySelector('.popup__type').textContent = translateItem(card.offer.type);
  cardItem.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} ${numWord(card.offer.rooms,['комната','комнаты','комнат'])} для ${card.offer.guests} ${numWord(card.offer.guests,['гостя','гостей','гостей'])}`;
  cardItem.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  // Выводит все доступные удобства в объявлении
  const featureContainer = cardItem.querySelector('.popup__features');
  featureContainer.innerHTML = '';
  card.offer.features.forEach((featureType) => {
    const userFeature = document.createElement('li');
    userFeature.classList.add('popup__feature');
    userFeature.classList.add(`popup__feature--${featureType}`);
    featureContainer.appendChild(userFeature);
  });
  // Выводит описание объекта
  cardItem.querySelector('.popup__description').textContent = card.offer.description;
  infoCheck(cardItem.querySelector('.popup__description'));
  // Выводит фотографии из списка offer.photos
  const photosContainer = cardItem.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  card.offer.photos.forEach((adress) => {
    const photo = popupPhotoTemplate.cloneNode(true);
    photo.src = adress;
    photosContainer.appendChild(photo);
  });
  // Выводит фотографии для автарок
  cardItem.querySelector('.popup__avatar').src = card.author.avatar;

  return cardItem;
};

// Создает маркер
const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {location:{lat, lng}} = point;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    }
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(point));
};

points.forEach((point) => {
  createMarker(point);
});

housingTypeFilter.addEventListener('change', () => {
  markerGroup.clearLayers();
  points.filter((element) => element.offer.type === housingTypeFilter.value).forEach((point) => {
    createMarker(point);
  });
  if (housingTypeFilter.value === 'any') {
    points.forEach((point) => {
      createMarker(point);
    });
  }
});
