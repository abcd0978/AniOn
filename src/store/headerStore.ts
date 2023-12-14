import { atom } from 'jotai';
export const activeMenu = atom<string>(window.location.pathname); //
export const searchMobileClicked = atom<boolean>(false);

export const alarmNote = atom<boolean>(false); // 쪽지 알람
