import { atom } from 'jotai';
import { laftelParamsM } from '../types/anime';

export const selectedCategoryAtom = atom('전체');

export const selectedGenresAtom = atom<laftelParamsM['genres']>([]);

export const selectedYearsAtom = atom<laftelParamsM['years']>(null);

export const isEndingAtom = atom<laftelParamsM['ending']>(null);

export const offsetAtom = atom<laftelParamsM['offset']>(0);