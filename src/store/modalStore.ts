import { atom } from 'jotai';
type Item = {
  id: string;
  index: number;
  name: string;
  price: number;
  img_url: string;
};
export const isModalOpened = atom(false);
export const modalContents = atom('login');
export const borderModalContent = atom<Item | null>(null);
export const awardModalContent = atom<Item | null>(null);
