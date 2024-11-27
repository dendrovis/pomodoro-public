import { CACHE_ID } from '../../constants';
import { cache } from '../index';
import type { SetValue, GetValue, OnSave, Theme, States } from './type';

const states: States = { value: 'dark' };

const setValue: SetValue = (value) => (states.value = value);

const getValue: GetValue = () => states.value;

const onSave: OnSave = () =>
  cache.isCached() ? cache.add(CACHE_ID.THEME, String(states.value)) : false;

const theme: Theme = { onSave, setValue, getValue };

export default theme;
