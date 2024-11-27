//global states
type States = {
  timer: 'play' | 'stop' | 'pause' | 'done';
  activeOverlay: 'help' | 'info' | null;
};

export const states: States = {
  timer: 'pause',
  activeOverlay: null,
};
