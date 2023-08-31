import { atom } from 'jotai';
type BorderItem = {
  id: string;
  index: number;
  title: string;
  price: number;
  img_url: string;
};
type AwardItem = {
  id: string;
  index: number;
  title: string;
  price: number;
};
export const isModalOpened = atom(false);
export const modalContents = atom('login');
export const borderModalContent = atom<BorderItem | null>(null);
export const awardModalContent = atom<AwardItem | null>(null);
