import { alarmer } from '../../utils';

type OnToggleAlarm = (value: boolean) => void;

const onToggleAlarm: OnToggleAlarm = (value) => alarmer.setValue(value);

export default onToggleAlarm;
