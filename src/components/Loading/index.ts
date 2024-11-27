import { ANIMATED_CHARACTER_RUN } from '../../assets';
import { lastArrayElement } from '../../utils';
import { LoadingType } from './type';

const Loading: LoadingType = (elementTargetID) => {
  const element = document.querySelector(elementTargetID);
  if (!element) throw new Error('invalid element');
  element.innerHTML = `<img src="${ANIMATED_CHARACTER_RUN}" alt="${lastArrayElement(ANIMATED_CHARACTER_RUN, '/')}">`;
};
export default Loading;
