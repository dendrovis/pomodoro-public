import { CACHE_ID } from '../../constants';
import { cache } from '../index';
import type { SetValue, GetValue, OnSave, Alarmer, States } from './type';

const states: States = { value: false };

const setValue: SetValue = (value) => (states.value = value);

const getValue: GetValue = () => states.value;

const onSave: OnSave = () =>
  cache.isCached() ? cache.add(CACHE_ID.ALARM, String(states.value)) : false;

const alarmNow = (element: HTMLAudioElement) => {
  if (states.value === true) element.play();
};

const alarmer: Alarmer = { onSave, setValue, getValue, alarmNow };

export default alarmer;
