// Фильтрация карты
const filters = document.querySelector('.map__filters');
const typeFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');

const translatePrice = (price) => {if (price < 10000) {return 'low';} else if (price >= 10000 && price <= 50000) {return 'middle';} return 'high';};

// Фильтрация объявлений по основным фильтрам
const compareCards = (card) => {
  const checkedNodeList = filters.querySelectorAll('.map__checkbox:checked');
  const checkedList = Array.prototype.slice.call(checkedNodeList).map((el) => el.value);
  return (card.offer.type === typeFilter.value || typeFilter.value === 'any')
&& (translatePrice(card.offer.price) === priceFilter.value || priceFilter.value === 'any')
&& (card.offer.rooms === Number(roomsFilter.value) || roomsFilter.value === 'any')
&& (card.offer.guests === Number(guestsFilter.value) || guestsFilter.value === 'any')
&& checkedList.every((element) => card.offer.features && card.offer.features.includes(element));
};

const setFormChange = (cb) => {
  filters.addEventListener('change', () => {
    cb();
  });
};

export {compareCards, setFormChange};
