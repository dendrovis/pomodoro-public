import { ANIMATED_CHARACTER_IDLE, ANIMATED_CHARACTER_RUN } from '../../assets';
import { lastArrayElement } from '../../utils';
import Classes from './index.module.css';
import type { CreateContainer, MotionImageType, SetAnimate, States } from './type';

const states: States = {};

const createContainer: CreateContainer = (id) => {
  const element = document.createElement('div');
  element.id = `motion-image-${id}`;
  element.className = `${Classes.container}`;
  return element;
};

const MotionImage: MotionImageType = (id, elementTargetID) => {
  if (Object.hasOwn(states, id))
    throw new Error('existed property, make sure property name is distinct');
  const elementTarget = document.querySelector(elementTargetID);
  if (!elementTarget) throw new Error('element not available');
  const elementContainer = createContainer(id);
  states[id] = { state: 'idle', elementContainer };
  elementContainer.innerHTML = `<img src="${ANIMATED_CHARACTER_IDLE}" alt="${lastArrayElement(ANIMATED_CHARACTER_IDLE, '/')}">`;
  elementTarget.appendChild(elementContainer);
};

const setAnimate: SetAnimate = (id, type) => {
  const element = states[id].elementContainer;
  if (!element) throw new Error('element not exist');
  switch (type) {
    case 'idle':
      element.innerHTML = `<img src="${ANIMATED_CHARACTER_IDLE}" alt="${lastArrayElement(ANIMATED_CHARACTER_IDLE, '/')}">`;
      break;
    case 'run':
      element.innerHTML = `<img src="${ANIMATED_CHARACTER_RUN}" alt="${lastArrayElement(ANIMATED_CHARACTER_RUN, '/')}">`;
      break;
    default:
      throw new Error('undefined animate type');
  }
};

MotionImage.setAnimate = setAnimate;

export default MotionImage;
