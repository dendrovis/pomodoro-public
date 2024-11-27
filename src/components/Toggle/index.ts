import type {
  ToggleType,
  States,
  OnClick,
  ClassnamesToggle,
  ClassnamesCircularToggle,
  SetLock,
  RenderIcon,
  SetTheme,
} from './type';
import Classes from './index.module.css';
import classNames from 'classnames';
import { inverse, isSVGRawTag, lastArrayElement } from '../../utils';
import { ICON_LOCK } from '../../assets';

const states: States = {};

// classnames controller
const classnamesToggle: ClassnamesToggle = (value, backgroundImage, isLock) =>
  classNames(Classes.toggle, {
    [Classes.on]: value,
    [Classes['with-background']]: backgroundImage !== undefined,
    [Classes['toggle-lock']]: isLock,
  });

const classnamesCircularToggle: ClassnamesCircularToggle = (value, isLock) =>
  classNames(Classes['circular-toggle'], {
    [Classes.on]: value,
    [Classes['circular-toggle-lock']]: isLock,
  });

// optional components TODO: part of icon components
const renderIcon: RenderIcon = (id, iconOn, iconOff, value) => {
  if (!iconOff || !iconOn) return '';
  if (isSVGRawTag(iconOff) && isSVGRawTag(iconOn)) {
    states[id].isSVG = true;
    if (value) return `${iconOn}`;
    return `${iconOff}`;
  }
  states[id].iconOffAlt = lastArrayElement(iconOff, '/');
  states[id].iconOnAlt = lastArrayElement(iconOn, '/');
  if (value) return `<img src=${iconOn} alt="${states[id].iconOnAlt}">`;
  return `<img src=${iconOff} alt="${states[id].iconOffAlt}">`;
};

// TODO: optimised in a way controller, view layer is better seperated
const Toggle: ToggleType = ({
  id,
  iconOff,
  iconOn,
  label,
  isLock = false,
  onToggle,
  iniValue,
  backgroundImage,
  colorToggle,
}) => {
  if (Object.hasOwn(states, id))
    throw new Error('existed property, make sure property name is distinct');

  // set states
  states[id] = {
    iconOff,
    iconOn,
    label,
    isLock,
    onToggle,
    value: iniValue,
    isSVG: false,
    backgroundImage,
    colorToggle,
  };

  const renderLabel = label
    ? `<div id="toggle-${id}-label" class="${Classes.label}">${label}</div>`
    : '';

  // custom styles
  const customToggleStyle = colorToggle
    ? `style="--background-color:${colorToggle?.off};--background-color-on:${colorToggle?.on}"`
    : '';

  const customBackgroundStyle = backgroundImage
    ? `style="--background-image:url(${backgroundImage})`
    : '';

  // required component part
  const renderCircularToggle = `
    <div id="toggle-${id}-action" class="${classnamesCircularToggle(iniValue, isLock)}" ${customToggleStyle}>
      ${renderIcon(id, iconOn, iconOff, iniValue)}
    </div>`;

  return `
    <div id="${id}" class="${Classes.container}">
      ${renderLabel}
      <div id="toggle-${id}" class="${classnamesToggle(iniValue, backgroundImage, isLock)}" ${customBackgroundStyle}">
        ${renderCircularToggle}
      </div>
    </div>`;
};

const onClick: OnClick = (id) => {
  if (states[id].isLock) return;

  const onToggle = states[id].onToggle;
  if (onToggle === undefined) return;

  // logic
  const value = inverse(states[id].value);

  // update states
  states[id].value = value;

  // re-render ui
  const elementToggle = document.querySelector(`#toggle-${id}-action`);
  if (elementToggle) {
    elementToggle.className = classnamesCircularToggle(value, false);
    const iconOn = states[id].iconOn;
    const iconOff = states[id].iconOff;
    const isSVG = states[id].isSVG;
    const iconOnAlt = states[id].iconOnAlt;
    const iconOffAlt = states[id].iconOffAlt;
    if (iconOn && iconOff && isSVG) elementToggle.innerHTML = value ? iconOn : iconOff;
    else if (iconOn && iconOff)
      elementToggle.innerHTML = value
        ? `<img src=${iconOn} alt="${iconOnAlt}">`
        : `<img src=${iconOff} alt="${iconOffAlt}">`;
  }
  const elementContainer = document.querySelector(`#toggle-${id}`);
  if (elementContainer) {
    const backgroundImage = states[id].backgroundImage;
    elementContainer.className = classnamesToggle(value, backgroundImage, false);
  }

  // invoke callbacks
  onToggle(value);
};

const setLock: SetLock = (id, value) => {
  const elementCircular = document.querySelector(`#toggle-${id}-action`);
  const elementContainer = document.querySelector(`#toggle-${id}`);
  states[id].isLock = value;
  if (!elementCircular || !elementContainer) throw new Error('undefined element');
  elementCircular.className = classnamesCircularToggle(states[id].value, value);
  elementContainer.className = classnamesToggle(
    states[id].value,
    states[id].backgroundImage,
    value
  );
  if (value) {
    elementCircular.innerHTML = renderIcon(id, ICON_LOCK, ICON_LOCK, value);
  } else {
    elementCircular.innerHTML = renderIcon(id, states[id].iconOn, states[id].iconOff, value);
  }
};

const initializeComponent = () => {
  Object.keys(states).forEach((id) => {
    if (states[id].onToggle !== undefined) {
      const element = document.querySelector(`#toggle-${id}`);
      element?.addEventListener('click', () => onClick(id));
    }
  });
};

document.addEventListener('DOMContentLoaded', initializeComponent);

const setTheme: SetTheme = (id, theme) => {
  const element = document.querySelector(`#toggle-${id}-label`);
  if (!element) throw new Error('element undefined');
  if (theme === 'dark') {
    element.className = `${Classes.label} ${Classes['label-dark']}`;
  } else {
    element.className = `${Classes.label}`;
  }
};

Toggle.setLock = setLock;
Toggle.setTheme = setTheme;

export default Toggle;
