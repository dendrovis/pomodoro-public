import { CACHE_ID } from '../../constants';
import { cache } from '../index';
import type { SetValue, GetValue, OnSave, Locker, States } from './type';

const states: States = { value: false };

const setValue: SetValue = (value) => (states.value = value);

const getValue: GetValue = () => states.value;

const onSave: OnSave = () =>
  cache.isCached() ? cache.add(CACHE_ID.LOCKER, String(states.value)) : false;

const locker: Locker = { onSave, setValue, getValue };

export default locker;
