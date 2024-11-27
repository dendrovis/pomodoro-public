import { MotionImage, Slider } from '../../components';
import { states } from '../../states';

type OnPlay = (sliderId: string, timerCharacterId: string) => void;

const onPlay: OnPlay = (sliderId, timerCharacterId) => {
  Slider.setLock(sliderId, true);
  MotionImage.setAnimate(timerCharacterId, 'run');
  states.timer = 'play';
};

export default onPlay;
