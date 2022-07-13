// Фильтрация карты
const filters = document.querySelector('.map__filters');
// const typeFilter = filters.querySelector('#housing-type');
// const priceFilter = filters.querySelector('#housing-price');
// const roomsFilter = filters.querySelector('#housing-rooms');
// const guestsFilter = filters.querySelector('#housing-guests');
// const wifiFilter = filters.querySelector('#filter-wifi');
// const dishwasherFilter = filters.querySelector('#filter-dishwasher');
// const parkingFilter = filters.querySelector('#filter-parking');
// const washerFilter = filters.querySelector('#filter-washer');
// const elevatorFilter = filters.querySelector('#filter-elevator');
// const conditionerFilter = filters.querySelector('#filter-conditioner');


// const setTypeChange = (cb) => {
//   typeFilter.addEventListener('change', () => {
//     cb();
//   });
// };

// const setPriceChange = (cb) => {
//   priceFilter.addEventListener('change', () => {
//     cb();
//   });
// };

// const setRoomsChange = (cb) => {
//   roomsFilter.addEventListener('change', () => {
//     cb();
//   });
// };

// const setGuestsChange = (cb) => {
//   guestsFilter.addEventListener('change', () => {
//     cb();
//   });
// };

// const setWifiChange = (cb) => {
//   wifiFilter.addEventListener('change', () => {
//     cb();
//   });
// };

// const setDishwasherChange = (cb) => {
//   dishwasherFilter.addEventListener('change', () => {
//     cb();
//   });
// };

// const setParkingChange = (cb) => {
//   parkingFilter.addEventListener('change', () => {
//     cb();
//   });
// };

// const setWasherChange = (cb) => {
//   washerFilter.addEventListener('change', () => {
//     cb();
//   });
// };

// const setElevatorChange = (cb) => {
//   elevatorFilter.addEventListener('change', () => {
//     cb();
//   });
// };

// const setConditionerChange = (cb) => {
//   conditionerFilter.addEventListener('change', () => {
//     cb();
//   });
// };

// const translatePrice = (price) => {
//   let value = '';
//   if (price < 10000) {
//     value = 'low';
//   } else if (price >= 10000 && price <= 50000) {
//     value = 'middle';
//   } else {
//     value = 'high';
//   }
//   return value;
// };

// // Фильтрация объявлений по основным фильтрам
// const compareCards = (card) => (card.offer.type === typeFilter.value || typeFilter.value === 'any')
// && (translatePrice(card.offer.price) === priceFilter.value || priceFilter.value === 'any')
// && (card.offer.rooms === Number(roomsFilter.value) || roomsFilter.value === 'any')
// && (card.offer.guests === Number(guestsFilter.value) || guestsFilter.value === 'any');

// const compareCardsFeatures = (card) => {
//   if (wifiFilter.checked && !card.offer.features || wifiFilter.checked && !card.offer.features.includes(wifiFilter.value)) {
//     return false;
//   }
//   if (dishwasherFilter.checked && !card.offer.features || dishwasherFilter.checked && !card.offer.features.includes(dishwasherFilter.value)) {
//     return false;
//   }
//   if (parkingFilter.checked && !card.offer.features || parkingFilter.checked && !card.offer.features.includes(parkingFilter.value)) {
//     return false;
//   }
//   if (washerFilter.checked && !card.offer.features || washerFilter.checked && !card.offer.features.includes(washerFilter.value)) {
//     return false;
//   }
//   if (elevatorFilter.checked && !card.offer.features || elevatorFilter.checked && !card.offer.features.includes(elevatorFilter.value)) {
//     return false;
//   }
//   if (conditionerFilter.checked && !card.offer.features || conditionerFilter.checked && !card.offer.features.includes(conditionerFilter.value)) {
//     return false;
//   }
//   return true;
// };

const filterFeatures = Array.from(filters.querySelectorAll('input[name=features]'));

const setFormChange = (cb) => {
  filterFeatures.forEach((filter) => {
    filter.addEventListener('change', () => {
      cb();
    });
  });
};

const compareFeatures = (card) => {
  filterFeatures.forEach((feature) => {
    if (feature.checked && !card.offer.features || feature.checked && !card.offer.features.includes(feature.value)) {
      return false;
    }
    return true;
  });
};

// Функции для сортировки
// const getCardRank = (card) => {
//   let rank = 0;
//   if (card.offer.features) {
//     if (card.offer.features.includes(wifiFilter.value) && wifiFilter.checked) {
//       rank += 1;
//     }
//     if (card.offer.features.includes(dishwasherFilter.value) && dishwasherFilter.checked) {
//       rank += 1;
//     }
//     if (card.offer.features.includes(parkingFilter.value) && parkingFilter.checked) {
//       rank += 1;
//     }
//     if (card.offer.features.includes(washerFilter.value) && washerFilter.checked) {
//       rank += 1;
//     }
//     if (card.offer.features.includes(elevatorFilter.value) && elevatorFilter.checked) {
//       rank += 1;
//     }
//     if (card.offer.features.includes(conditionerFilter.value) && conditionerFilter.checked) {
//       rank += 1;
//     }
//   }
//   return rank;
// };

// const compareCardsFeatures = (cardA, cardB) => {
//   const rankA = getCardRank(cardA);
//   const rankB = getCardRank(cardB);
//   return rankB - rankA;
// };

export {/*compareCards, compareCardsFeatures, setTypeChange, setPriceChange, setRoomsChange, setGuestsChange, setWifiChange, setDishwasherChange, setParkingChange,
setWasherChange, setElevatorChange, setConditionerChange*/ setFormChange, compareFeatures};
