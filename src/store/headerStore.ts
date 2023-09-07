import { atom } from 'jotai';
export const activeMenu = atom<string>(window.location.pathname);
