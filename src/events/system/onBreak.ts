import { alarmer } from '../../utils';

type OnBreak = () => void;

const onBreak: OnBreak = () => {
  const isAlarm = alarmer.getValue();
  if (!isAlarm) return;
  const elementAudio = document.querySelector('#alarm-break') as HTMLAudioElement;
  if (!elementAudio) throw new Error('undefined element');
  alarmer.alarmNow(elementAudio);
};

export default onBreak;
