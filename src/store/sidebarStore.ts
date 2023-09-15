import { atom } from 'jotai';
export const sideBarOpened = atom(false);
export const downBarOpened = atom(false);
export const downBarRef = atom<React.MutableRefObject<HTMLDivElement> | null>(
  null,
);
