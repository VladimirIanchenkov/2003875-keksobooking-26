import {createAdverts} from './data.js';
import {translateItem, numWord, infoCheck} from './util.js';

const mapCanvas = document.querySelector('.map__canvas');
const cardItemTemplate = document.querySelector('#card').content.querySelector('.popup');
const popupPhotoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');

const similarAdverts = createAdverts(1);

similarAdverts.forEach((card) => {
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
  const photoItems = card.offer.photos;
  photoItems.forEach((adress) => {
    const photo = popupPhotoTemplate.cloneNode(true);
    photo.src = adress;
    cardItem.querySelector('.popup__photos').appendChild(photo);
  });
  // Выводит фотографии для автарок
  cardItem.querySelector('.popup__avatar').src = card.author.avatar;
  mapCanvas.appendChild(cardItem);
});
