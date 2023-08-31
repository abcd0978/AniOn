import { atom } from 'jotai';
type BorderItem = {
  id: string;
  index: number;
  title: string;
  price: number;
  img_url: string;
};
export const isModalOpened = atom(false);
export const modalContents = atom('login');
export const borderModalContent = atom<BorderItem | null>(null);
