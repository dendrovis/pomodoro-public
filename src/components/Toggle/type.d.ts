type Properties = {
  iconOff?: string;
  colorToggle?: { on: string; off: string };
  iconOn?: string;
  backgroundImage?: string;
  label?: string;
  isLock?: boolean;
  onToggle?: (value: boolean) => void;
};

export type States = {
  [id: string]: Properties & {
    value: boolean;
    isSVG: boolean;
    iconOffAlt?: string;
    iconOnAlt?: string;
  };
};

type ToggleProps = {
  id: string;
} & Properties & { iniValue: boolean };

export type OnClick = (id: string) => void;
export type ClassnamesToggle = (
  value: boolean,
  backgroundImage?: string,
  isLock: boolean
) => string;
export type ClassnamesCircularToggle = (value: boolean, isLock: boolean) => string;
export type SetLock = (id, value: boolean) => void;
export type RenderIcon = (id: string, iconOn?: string, iconOff?: string, value: boolean) => string;
export type SetTheme = (id: string, theme: 'dark' | 'light') => void;
export interface ToggleType {
  (params: ToggleProps): string;
  setLock: SetLock;
  setTheme: SetTheme;
}
