// Фукнция отключает элементы формы по классу формы (при вызове класс элемента указывается без '.')
function switchToDisabled (classToDisable) {
  const container = document.querySelector(`.${classToDisable}`);
  const elements = container.elements;
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
  container.classList.add(`${classToDisable}--disabled`);
}

switchToDisabled('ad-form');
switchToDisabled('map__filters');
