import { cache } from '../../utils';

type OnToggleCache = (value: boolean) => void;

const onToggleCache: OnToggleCache = (value) => (value ? cache.on() : cache.off());

export default onToggleCache;
