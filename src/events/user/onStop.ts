import { MotionImage, Slider } from '../../components';
import { states } from '../../states';
import { locker } from '../../utils';

type OnStop = (sliderId: string, timerCharacterId: string) => void;

const onStop: OnStop = (sliderId, timerCharacterId) => {
  Slider.setLock(sliderId, locker.getValue());
  MotionImage.setAnimate(timerCharacterId, 'idle');
  states.timer = 'stop';
};

export default onStop;
