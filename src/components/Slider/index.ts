import { ICON_LOCK, ICON_MINUS, ICON_PLUS } from '../../assets';
import { lastArrayElement } from '../../utils';
import Classes from './index.module.css';
import {
  GetNewLabel,
  RenderContainer,
  RenderInnerContainer,
  RenderInput,
  RenderLabel,
  RenderMinusButton,
  RenderPlusButton,
  SetLock,
  SetTheme,
  SliderType,
  States,
} from './type';

const states: States = {};

const renderLabel: RenderLabel = ({ label, id, elementTarget, value = '-1' }) => {
  if (!label) return;
  const element = document.createElement('label');
  element.innerHTML = `${value} ${label}`;
  element.id = `slider-${id}-label`;
  element.className = Classes.label;
  element.setAttribute('for', `slider-${id}-input`);
  elementTarget.appendChild(element);
  states[id].elementLabel = element;
  return element;
};

const renderInput: RenderInput = ({ id, elementTarget, onChange, elementLabel, value }) => {
  const element = document.createElement('input');
  element.type = 'range';
  element.id = `slider-${id}-input`;
  element.className = Classes.input;
  element.min = '1';
  element.max = '48';
  element.step = '1';
  element.value = value;
  // only callback when slided to final destination
  element.onchange = (event) => {
    const value = Number((event.currentTarget as HTMLInputElement).value);
    onChange(value);
  };
  // responsive label updates when sliding
  if (elementLabel)
    element.addEventListener('input', (event) => {
      const value = (event.currentTarget as HTMLInputElement).value;
      elementLabel.textContent = getNewLabel(value, elementLabel.innerHTML);
    });
  elementTarget.appendChild(element);
  states[id].elementInput = element;
  return element;
};

const renderContainer: RenderContainer = ({ id, elementTarget }) => {
  const element = document.createElement('div');
  element.id = `slider-${id}`;
  element.className = Classes.container;
  elementTarget.appendChild(element);
  return element;
};

const renderInnerContainer: RenderInnerContainer = ({ id, elementTarget }) => {
  const element = document.createElement('div');
  element.id = `slider-${id}-inner`;
  element.className = Classes['inner-container'];
  elementTarget.appendChild(element);
  return element;
};

const renderMinusButton: RenderMinusButton = ({
  id,
  elementInput,
  elementLabel,
  elementTarget,
  onChange,
}) => {
  const element = document.createElement('button');
  element.id = `slider-${id}-button-minus`;
  element.onclick = () => {
    const MINIMUM = 1;
    const value = elementInput.value;
    if (Number(elementInput.value) > MINIMUM) {
      const newValue = `${Number(value) - 1}`;
      elementInput.value = newValue;
      if (elementLabel) elementLabel.textContent = getNewLabel(newValue, elementLabel.innerHTML);
      onChange(Number(newValue));
    }
  };
  element.innerHTML = ICON_MINUS;
  element.className = Classes.minus;
  elementTarget.insertBefore(element, elementInput);
  states[id].elementButtonMinus = element;
};

const renderPlusButton: RenderPlusButton = ({
  id,
  elementInput,
  elementLabel,
  elementTarget,
  onChange,
}) => {
  const element = document.createElement('button');
  element.id = `slider-${id}-button-plus`;
  element.onclick = () => {
    const MAXIMUM = 48;
    const value = elementInput.value;
    if (Number(elementInput.value) < MAXIMUM) {
      const newValue = `${Number(value) + 1}`;
      elementInput.value = newValue;
      if (elementLabel) elementLabel.textContent = getNewLabel(newValue, elementLabel.innerHTML);
      onChange(Number(newValue));
    }
  };
  element.innerHTML = ICON_PLUS;
  element.className = Classes.plus;
  elementTarget.appendChild(element);
  states[id].elementButtonPlus = element;
};

const getNewLabel: GetNewLabel = (value, labelOrigin) => {
  const labelBare = lastArrayElement(labelOrigin, ' ');
  const label = labelBare?.endsWith('s') ? labelBare.slice(0, -1) : labelBare;
  if (!label) return 'undefined';
  if (Number(value) > 1) return `${value} ${label}s`;
  else return `${value} ${label}`;
};

const setLock: SetLock = (id, isLock) => {
  const elementButtonMinus = states[id].elementButtonMinus;
  const elementButtonPlus = states[id].elementButtonPlus;
  const elementInput = states[id].elementInput;
  if (!elementButtonMinus || !elementButtonPlus || !elementInput)
    throw new Error('undefined element');

  if (isLock) {
    elementButtonMinus.innerHTML = ICON_LOCK;
    elementButtonMinus.disabled = true;
    elementButtonPlus.innerHTML = ICON_LOCK;
    elementButtonPlus.disabled = true;
    elementInput.className = `${Classes.input} ${Classes['input-lock']}`;
    elementInput.disabled = true;
  } else {
    elementButtonMinus.innerHTML = ICON_MINUS;
    elementButtonMinus.disabled = false;
    elementButtonPlus.innerHTML = ICON_PLUS;
    elementButtonPlus.disabled = false;
    elementInput.className = `${Classes.input}`;
    elementInput.disabled = false;
  }
};
const setTheme: SetTheme = (id, theme) => {
  const elementButtonMinus = states[id].elementButtonMinus;
  const elementButtonPlus = states[id].elementButtonPlus;
  const elementLabel = states[id].elementLabel;
  if (!elementButtonMinus || !elementButtonPlus) throw new Error('undefined element');

  if (theme === 'dark') {
    if (elementLabel) elementLabel.className = `${Classes.label} ${Classes['label-dark']}`;
    elementButtonPlus.className = `${Classes.plus} ${Classes['button-dark']}`;
    elementButtonMinus.className = `${Classes.plus} ${Classes['button-dark']}`;
  } else {
    if (elementLabel) elementLabel.className = `${Classes.label}`;
    elementButtonPlus.className = `${Classes.plus}`;
    elementButtonMinus.className = `${Classes.plus}`;
  }
};

const Slider: SliderType = ({
  id,
  label,
  elementTargetID,
  onChange,
  value,
}: {
  id: string;
  label?: string;
  elementTargetID: string;
  onChange: (value: number) => void;
  value: string;
}) => {
  if (Object.hasOwn(states, id))
    throw new Error('existed property, make sure property name is distinct');
  const elementTarget = document.querySelector(elementTargetID);
  if (!elementTarget) throw new Error('element not available');
  states[id] = {};
  const elementContainer = renderContainer({ id, elementTarget });
  const elementLabel = renderLabel({ id, label, elementTarget: elementContainer, value });
  const elementInnerContainer = renderInnerContainer({
    id,
    elementTarget: elementContainer,
  });
  const elementInput = renderInput({
    id,
    elementTarget: elementInnerContainer,
    onChange,
    elementLabel,
    value,
  });
  renderMinusButton({
    id,
    elementInput,
    elementLabel,
    elementTarget: elementInnerContainer,
    onChange,
  });
  renderPlusButton({
    id,
    elementInput,
    elementLabel,
    elementTarget: elementInnerContainer,
    onChange,
  });
};

Slider.setLock = setLock;
Slider.setTheme = setTheme;

export default Slider;
