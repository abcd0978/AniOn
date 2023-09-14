import { atom } from 'jotai';
export const activeMenu = atom<string>(window.location.pathname); //
export const searchMobileClicked = atom<boolean>(false);
