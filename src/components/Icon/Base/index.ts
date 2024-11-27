import { ICON_CLOSE } from '../../../assets';
import { isSVGRawTag } from '../../../utils';
import Classes from './index.module.css';
import { BaseType, CreateContainer, SetClosed, SetTheme, State } from './type';

const states: State = {};

const createContainer: CreateContainer = (id, onClick) => {
  const element = document.createElement('div');
  element.id = `icon-base-${id}`;
  element.onclick = () => onClick();
  element.className = `${Classes['icon-base']}`;
  return element;
};

const setTheme: SetTheme = (id, theme) => {
  const element = states[id].elementContainer;
  if (!element) throw new Error('element not available');
  if (theme === 'dark') {
    element.className = `${Classes['icon-base']} ${Classes['icon-base-dark']}`;
    states[id].theme = 'dark';
  } else {
    element.className = `${Classes['icon-base']}`;
    states[id].theme = 'light';
  }
};

const Base: BaseType = ({ id, icon, onClick, theme = 'light', elementTargetID }) => {
  if (Object.hasOwn(states, id))
    throw new Error('existed property, make sure property name is distinct');
  if (!isSVGRawTag(icon)) throw new Error('only support svg format');
  const elementTarget = document.querySelector(elementTargetID);
  if (!elementTarget) throw new Error('element not available');
  const elementContainer = createContainer(id, onClick);
  states[id] = { elementContainer, isClosed: false, icon, theme };
  elementContainer.innerHTML = icon;
  setTheme(id, theme);
  elementTarget.appendChild(elementContainer);
};

const setClosed: SetClosed = (id, isClosed) => {
  states[id].isClosed = isClosed;
  const element = states[id].elementContainer;
  if (!element) throw new Error('element not available');
  if (isClosed) {
    element.innerHTML = ICON_CLOSE;
    element.className = `${Classes['icon-base']} ${Classes['icon-base-closed']}`;
  } else {
    element.innerHTML = states[id].icon;
    setTheme(id, states[id].theme);
  }
};

Base.setTheme = setTheme;
Base.setClosed = setClosed;

export default Base;
