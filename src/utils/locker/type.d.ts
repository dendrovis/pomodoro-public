export type Locker = {
  onSave: OnSave;
  setValue: SetValue;
  getValue: GetValue;
};

export type OnSave = () => string | false;
export type SetValue = (value: boolean) => void;
export type GetValue = () => boolean;
export type States = { value: boolean };
