import { Timer } from '../../components';

type OnChangeSlider = (sliderId: string, value: number) => void;

const onChangeSlider: OnChangeSlider = (sliderId, value) => Timer.setCycle(sliderId, value);

export default onChangeSlider;
