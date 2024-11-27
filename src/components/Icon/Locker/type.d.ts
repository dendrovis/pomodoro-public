type Theme = 'light' | 'dark';
export type States = {
  [id: string]: {
    elementContainer?: HTMLDivElement;
    isLocked: boolean;
    theme: Theme;
  };
};
export type CreateContainer = (id: string, onClick: (isLocked: boolean) => void) => HTMLDivElement;
export type SetTheme = (id: string, theme: Theme) => void;
export interface LockerType {
  (params: {
    id: string;
    isLocked: boolean;
    onClick: (isLocked: boolean) => void;
    theme?: Theme;
    elementTargetID: string;
  }): void;
  setTheme: SetTheme;
}
