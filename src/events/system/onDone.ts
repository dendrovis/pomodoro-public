import { MotionImage, Slider } from '../../components';
import { states } from '../../states';
import { alarmer, locker } from '../../utils';

type OnDone = (sliderId: string, timerCharacterId: string) => void;

const onDone: OnDone = (sliderId, timerCharacterId) => {
  Slider.setLock(sliderId, locker.getValue());
  MotionImage.setAnimate(timerCharacterId, 'idle');
  states.timer = 'done';
  const isAlarm = alarmer.getValue();
  if (!isAlarm) return;
  const elementAudio = document.querySelector('#alarm-productivity') as HTMLAudioElement;
  if (!elementAudio) throw new Error('undefined element');
  alarmer.alarmNow(elementAudio);
};

export default onDone;
