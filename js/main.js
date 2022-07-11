import './form-setup.js';
import './map.js';
import './util.js';
import './popup.js';
import './api.js';
import {getData} from './api.js';
import {createAdvertsBaloons, switchToEnabled} from './map.js';
import {showServerAlert} from './util.js';
import {setUserFormSubmit, pageReset} from './form-setup.js';
import {setTypeChange, setPriceChange, setRoomsChange, setGuestsChange, setWifiChange, setDishwasherChange, setParkingChange,
  setWasherChange, setElevatorChange, setConditionerChange} from './filters.js';

getData(
  (cards) => {
    createAdvertsBaloons(cards);
    switchToEnabled('map__filters');
    setTypeChange(() => createAdvertsBaloons(cards));
    setPriceChange(() => createAdvertsBaloons(cards));
    setRoomsChange(() => createAdvertsBaloons(cards));
    setGuestsChange(() => createAdvertsBaloons(cards));
    setWifiChange(() => createAdvertsBaloons(cards));
    setDishwasherChange(() => createAdvertsBaloons(cards));
    setParkingChange(() => createAdvertsBaloons(cards));
    setWasherChange(() => createAdvertsBaloons(cards));
    setElevatorChange(() => createAdvertsBaloons(cards));
    setConditionerChange(() => createAdvertsBaloons(cards));
  },
  () => {
    showServerAlert('Не удалось загрузить на карту данные о похожих объявлениях с сервера. Попробуйте обновить страницу');
  },
);

setUserFormSubmit(pageReset);
