// Фукнция отключает элементы формы по классу формы (при вызове класс элемента указывается без '.')
function switchToDisabled (classToDisable) {
  const container = document.querySelector(`.${classToDisable}`);
  const elements = container.elements;
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
  container.classList.add(`${classToDisable}--disabled`);
}

// Фукнция активирует элементы формы по классу формы (при вызове класс элемента указывается без '.')
function switchToEnabled (classToEnable) {
  const container = document.querySelector(`.${classToEnable}`);
  const elements = container.elements;
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
  container.classList.remove(`${classToEnable}--disabled`);
}

export {switchToDisabled, switchToEnabled};
