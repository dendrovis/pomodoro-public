import { ICON_LOCK, ICON_UNLOCK } from '../../../assets';
import { inverse } from '../../../utils';
import Classes from './index.module.css';
import { CreateContainer, LockerType, SetTheme, States } from './type';

const states: States = {};

const createContainer: CreateContainer = (id, onClick) => {
  const element = document.createElement('div');
  element.id = `icon-locker-${id}`;
  element.onclick = () => {
    states[id].isLocked = inverse(states[id].isLocked);
    const isLocked = states[id].isLocked;
    const element = states[id].elementContainer;
    if (!element) throw new Error('element not available');
    if (isLocked) {
      element.innerHTML = ICON_LOCK;
      element.className = `${Classes['icon-locker']} ${Classes['icon-locker-locked']}`;
    } else {
      element.innerHTML = ICON_UNLOCK;
      setTheme(id, states[id].theme);
    }
    onClick(isLocked);
  };
  element.className = `${Classes['icon-locker']}`;
  return element;
};

const setTheme: SetTheme = (id, theme) => {
  const element = states[id].elementContainer;
  if (!element) throw new Error('element not available');
  if (theme === 'dark') {
    element.className = `${Classes['icon-locker']} ${Classes['icon-locker-dark']}`;
    states[id].theme = 'dark';
  } else {
    element.className = `${Classes['icon-locker']}`;
    states[id].theme = 'light';
  }
};

const Locker: LockerType = ({ id, onClick, theme = 'light', elementTargetID, isLocked }) => {
  if (Object.hasOwn(states, id))
    throw new Error('existed property, make sure property name is distinct');
  const elementTarget = document.querySelector(elementTargetID);
  if (!elementTarget) throw new Error('element not available');
  const elementContainer = createContainer(id, onClick);
  states[id] = { elementContainer, isLocked, theme };
  if (isLocked) {
    elementContainer.innerHTML = ICON_LOCK;
    elementContainer.className = `${Classes['icon-locker']} ${Classes['icon-locker-locked']}`;
  } else {
    elementContainer.innerHTML = ICON_UNLOCK;
    elementContainer.className = `${Classes['icon-locker']}`;
    setTheme(id, theme);
  }
  elementTarget.appendChild(elementContainer);
};

Locker.setTheme = setTheme;

export default Locker;
