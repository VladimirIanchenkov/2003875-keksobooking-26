import {createCustomPopup} from './popup.js';

const userForm = document.querySelector('.ad-form');
const DEFAULT_LATITUDE = 35.67898;
const DEFAULT_LONGITUDE = 139.76918;
const filters = document.querySelector('.map__filters');
const housingTypeFilter = filters.querySelector('#housing-type');
const addressField = userForm.querySelector('#address');

// Фукнция активирует элементы формы по классу формы (при вызове класс элемента указывается без '.')
function switchToEnabled (classToEnable) {
  const container = document.querySelector(`.${classToEnable}`);
  const elements = container.elements;
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
  container.classList.remove(`${classToEnable}--disabled`);
}

// Отрисовывает карту
const map = L.map('map-canvas')
  .on('load', () => {
    switchToEnabled('ad-form');
    switchToEnabled('map__filters');
  })
  .setView({
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Создает маркер объявления пользователя
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

addressField.value = `lat: ${DEFAULT_LATITUDE}, lng: ${DEFAULT_LONGITUDE}`;

mainPinMarker.on('moveend', (evt) => {
  addressField.value = `lat: ${evt.target.getLatLng().lat.toFixed(5)}, lng: ${evt.target.getLatLng().lng.toFixed(5)}`;
});

// Ресет маркера пользователя
function resetMainPinMarker () {
  mainPinMarker.setLatLng({
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  });

  map.setView({
    lat: DEFAULT_LATITUDE,
    lng: DEFAULT_LONGITUDE,
  }, 13);

  addressField.value = `lat: ${DEFAULT_LATITUDE}, lng: ${DEFAULT_LONGITUDE}`;
}

// Закрывает открытые попапы
function closeAllPoups () {
  map.closePopup();
}

// Создает маркеры похожих объявлений
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createAdvertsBaloons = function (points) {
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

  // Фильтрация карты
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
};

export {createAdvertsBaloons, resetMainPinMarker, closeAllPoups};
