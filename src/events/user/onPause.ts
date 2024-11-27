import { MotionImage, Slider } from '../../components';
import { states } from '../../states';
import { locker } from '../../utils';

type OnPause = (sliderId: string, motionImageId: string) => void;

const onPause: OnPause = (sliderId, motionImageId) => {
  Slider.setLock(sliderId, locker.getValue());
  MotionImage.setAnimate(motionImageId, 'idle');
  states.timer = 'pause';
};

export default onPause;
