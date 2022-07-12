// Фильтрация карты
const filters = document.querySelector('.map__filters');
const typeFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');
const wifiFilter = filters.querySelector('#filter-wifi');
const dishwasherFilter = filters.querySelector('#filter-dishwasher');
const parkingFilter = filters.querySelector('#filter-parking');
const washerFilter = filters.querySelector('#filter-washer');
const elevatorFilter = filters.querySelector('#filter-elevator');
const conditionerFilter = filters.querySelector('#filter-conditioner');


const setTypeChange = (cb) => {
  typeFilter.addEventListener('change', () => {
    cb();
  });
};

const setPriceChange = (cb) => {
  priceFilter.addEventListener('change', () => {
    cb();
  });
};

const setRoomsChange = (cb) => {
  roomsFilter.addEventListener('change', () => {
    cb();
  });
};

const setGuestsChange = (cb) => {
  guestsFilter.addEventListener('change', () => {
    cb();
  });
};

const setWifiChange = (cb) => {
  wifiFilter.addEventListener('change', () => {
    cb();
  });
};

const setDishwasherChange = (cb) => {
  dishwasherFilter.addEventListener('change', () => {
    cb();
  });
};

const setParkingChange = (cb) => {
  parkingFilter.addEventListener('change', () => {
    cb();
  });
};

const setWasherChange = (cb) => {
  washerFilter.addEventListener('change', () => {
    cb();
  });
};

const setElevatorChange = (cb) => {
  elevatorFilter.addEventListener('change', () => {
    cb();
  });
};

const setConditionerChange = (cb) => {
  conditionerFilter.addEventListener('change', () => {
    cb();
  });
};

const priceTranslator = (price) => {
  let value = '';
  if (price < 10000) {
    value = 'low';
  } else if (price >= 10000 && price <= 50000) {
    value = 'middle';
  } else {
    value = 'high';
  }
  return value;
};

// Фильтрация объявлений по соновным фильтрам
const compareCards = (card) => {
  if (card.offer.type === typeFilter.value || typeFilter.value === 'any') {
    if (priceTranslator(card.offer.price) === priceFilter.value || priceFilter.value === 'any') {
      if (card.offer.rooms === Number(roomsFilter.value) || roomsFilter.value === 'any') {
        if (card.offer.guests === Number(guestsFilter.value) || guestsFilter.value === 'any') {
          return true;
        }}}}
  return false;
};

// Функции для сортировки
const getCardRank = (card) => {
  let rank = 0;
  if (card.offer.features) {
    if (card.offer.features.includes(wifiFilter.value) && wifiFilter.checked) {
      rank += 1;
    }
    if (card.offer.features.includes(dishwasherFilter.value) && dishwasherFilter.checked) {
      rank += 1;
    }
    if (card.offer.features.includes(parkingFilter.value) && parkingFilter.checked) {
      rank += 1;
    }
    if (card.offer.features.includes(washerFilter.value) && washerFilter.checked) {
      rank += 1;
    }
    if (card.offer.features.includes(elevatorFilter.value) && elevatorFilter.checked) {
      rank += 1;
    }
    if (card.offer.features.includes(conditionerFilter.value) && conditionerFilter.checked) {
      rank += 1;
    }
  }
  return rank;
};

const compareCardsFeatures = (cardA, cardB) => {
  const rankA = getCardRank(cardA);
  const rankB = getCardRank(cardB);
  return rankB - rankA;
};

export {compareCards, compareCardsFeatures, setTypeChange, setPriceChange, setRoomsChange, setGuestsChange, setWifiChange, setDishwasherChange, setParkingChange,
  setWasherChange, setElevatorChange, setConditionerChange};
