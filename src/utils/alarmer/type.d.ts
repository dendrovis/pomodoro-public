export type Alarmer = {
  onSave: OnSave;
  setValue: SetValue;
  getValue: GetValue;
  alarmNow: AlarmNow;
};

export type OnSave = () => string | false;
export type SetValue = (value: boolean) => void;
export type GetValue = () => boolean;
export type States = { value: boolean };
export type AlarmNow = (element: HTMLAudioElement) => void;
