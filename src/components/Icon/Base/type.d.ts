type Theme = 'light' | 'dark';
export type State = {
  [id: string]: {
    elementContainer?: HTMLDivElement;
    isClosed: boolean;
    icon: string;
    theme: Theme;
  };
};
export type CreateContainer = (id: string, onClick: IsClosed) => HTMLDivElement;
export type SetTheme = (id: string, theme: Theme) => void;
export type SetClosed = (id: string, isClosed: boolean) => void;
export type IsClosed = () => void;

export interface BaseType {
  (params: {
    id: string;
    icon: string;
    onClick: IsClosed;
    theme?: Theme;
    elementTargetID: string;
  }): void;
  setTheme: SetTheme;
  setClosed: SetClosed;
}
