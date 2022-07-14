import {createCustomPopup} from './popup.js';
import {compareCards, setFormChange} from './filters.js';
import {getData} from './api.js';
import {debounce, showServerAlert} from './util.js';

const DEFAULT_LATITUDE = 35.67898;
const DEFAULT_LONGITUDE = 139.76918;
const SIMILAR_CARD_COUNT = 10;
const RENDER_DELAY = 500;
const userForm = document.querySelector('.ad-form');
const addressField = userForm.querySelector('#address');

// Фукнция активирует элементы формы по классу формы (при вызове класс элемента указывается без '.')
const switchToEnabled = (classToEnable) => {
  const container = document.querySelector(`.${classToEnable}`);
  const elements = container.elements;
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
  container.classList.remove(`${classToEnable}--disabled`);
};

// Отрисовывает карту
const map = L.map('map-canvas')
  .on('load', () => {
    switchToEnabled('ad-form');
    getData(
      (cards) => {
        createAdvertsBaloons(cards);
        setFormChange(debounce(() => createAdvertsBaloons(cards), RENDER_DELAY));
        switchToEnabled('map__filters');
      },
      () => {
        showServerAlert('Не удалось загрузить на карту данные о похожих объявлениях с сервера. Попробуйте обновить страницу');
      },
    );
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

addressField.value = `${DEFAULT_LATITUDE}, ${DEFAULT_LONGITUDE}`;

mainPinMarker.on('moveend', (evt) => {
  addressField.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
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

  addressField.value = `${DEFAULT_LATITUDE}, ${DEFAULT_LONGITUDE}`;
}

// Закрывает открытые попапы
const closeAllPopups = () => {
  map.closePopup();
};

// Создает маркеры похожих объявлений
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

function createAdvertsBaloons (points) {

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

  markerGroup.clearLayers();
  points.filter(compareCards).slice(0, SIMILAR_CARD_COUNT).forEach((point) => {
    createMarker(point);
  });
}

export {createAdvertsBaloons, resetMainPinMarker, closeAllPopups, switchToEnabled};
