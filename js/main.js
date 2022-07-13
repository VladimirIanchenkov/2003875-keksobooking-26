import './map.js';
import './form-setup.js';
import './util.js';
import './popup.js';
import './api.js';
import './photo.js';
import './filters.js';
import {getData} from './api.js';
import {createAdvertsBaloons, switchToEnabled} from './map.js';
import {debounce, showServerAlert} from './util.js';
import {setUserFormSubmit, resetPage} from './form-setup.js';
import {/*setTypeChange, setPriceChange, setRoomsChange, setGuestsChange, setWifiChange, setDishwasherChange, setParkingChange,
setWasherChange, setElevatorChange, setConditionerChange*/setFormChange} from './filters.js';

const RENDER_DELAY = 500;

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

setUserFormSubmit(resetPage);
