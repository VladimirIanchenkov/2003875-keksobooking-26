import {translateItem, changeWord, checkNoContent} from './util.js';

// Отрисовывает карточку
const createCustomPopup = (card) => {
  const cardItemTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupPhotoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
  //Клонирование шаблона
  const cardItem = cardItemTemplate.cloneNode(true);
  cardItem.querySelector('.popup__title').textContent = card.offer.title;
  cardItem.querySelector('.popup__text--address').textContent = card.offer.address;
  cardItem.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  cardItem.querySelector('.popup__type').textContent = translateItem(card.offer.type);
  cardItem.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} ${changeWord(card.offer.rooms,['комната','комнаты','комнат'])} для ${card.offer.guests} ${changeWord(card.offer.guests,['гостя','гостей','гостей'])}`;
  cardItem.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  // Выводит все доступные удобства в объявлении
  const featureContainer = cardItem.querySelector('.popup__features');
  featureContainer.innerHTML = '';
  if (card.offer.features) {
    card.offer.features.forEach((featureType) => {
      const userFeature = document.createElement('li');
      userFeature.classList.add('popup__feature');
      userFeature.classList.add(`popup__feature--${featureType}`);
      featureContainer.appendChild(userFeature);
    });
  } else {
    featureContainer.classList.add('hidden');
  }
  // Выводит описание объекта
  cardItem.querySelector('.popup__description').textContent = card.offer.description;
  checkNoContent(cardItem.querySelector('.popup__description'));
  // Выводит фотографии из списка offer.photos
  const photosContainer = cardItem.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  if (card.offer.photos) {
    card.offer.photos.forEach((adress) => {
      const photo = popupPhotoTemplate.cloneNode(true);
      photo.src = adress;
      photosContainer.appendChild(photo);
    });
  } else {
    photosContainer.classList.add('hidden');
  }
  // Выводит фотографии для автарок
  cardItem.querySelector('.popup__avatar').src = card.author.avatar;

  return cardItem;
};

export {createCustomPopup};
