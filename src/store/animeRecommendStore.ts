import { atom } from 'jotai';
import { laftelParamsM } from '../types/anime';
import type { AnimeG } from '../types/anime';

export const animeListAtom = atom<AnimeG[]>([]);

export const selectedCategoryAtom = atom('전체');

export const selectedGenresAtom = atom<laftelParamsM['genres']>([]);

export const selectedYearsAtom = atom<laftelParamsM['years']>(null);

export const isEndingAtom = atom<laftelParamsM['ending']>(null);

export const offsetAtom = atom<laftelParamsM['offset']>(0);

export const keywordAtom = atom<laftelParamsM['keyword']>('');

export const isMobileFilterAtom = atom<boolean>(false);
