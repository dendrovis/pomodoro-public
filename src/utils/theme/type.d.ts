export type Theme = {
  onSave: OnSave;
  setValue: SetValue;
  getValue: GetValue;
};
type ThemeType = 'dark' | 'light';
export type OnSave = () => string | false;
export type SetValue = (value: ThemeType) => void;
export type GetValue = () => ThemeType;
export type States = { value: ThemeType };
