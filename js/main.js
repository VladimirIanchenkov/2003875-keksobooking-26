import './form-setup.js';
import './map.js';
import './util.js';
import './popup.js';
import './api.js';
import {getData} from './api.js';
import {createAdvertsBaloons} from './map.js';
import {showServerAlert} from './util.js';
import {setUserFormSubmit, pageReset} from './form-setup.js';

const SIMILAR_CARD_COUNT = 10;

getData(
  (cards) => {
    createAdvertsBaloons(cards.slice(0, SIMILAR_CARD_COUNT));
  },
  () => {
    showServerAlert('Не удалось загрузить на карту данные о похожих объявлениях с сервера. Попробуйте обновить страницу');
  },
);

setUserFormSubmit(pageReset);

export {SIMILAR_CARD_COUNT};
