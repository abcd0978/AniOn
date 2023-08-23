import api from './index';
import { laftelParamsM } from './../types/anime';

export const fetchAnimeList = async (laftelParams: laftelParamsM) => {
  // 배열 형태로 받기 때문에 ',' 단위로 join을 해준다.
  const genresParam = laftelParams.genres ? laftelParams.genres.join(',') : '';
  const tagsParam = laftelParams.tags ? laftelParams.tags.join(',') : '';

  const result = await api.get(`/search/v1/discover/?`, {
    params: {
      sort: laftelParams.sort,
      tags: tagsParam,
      genres: genresParam,
      offset: laftelParams.offset,
      size: laftelParams.size,
    },
  });
  console.log('fetch anime 실행', laftelParams);
  return {
    animeList: result!.data!.results!, // 애니 리스트
    isNextPage: result.data.next ? true : false, // 다음 페이지 유무
    count: result.data.count, // 필터링된 애니 개수
  };
};

export const getAnimePreview = async (animeId: string) => {
  const result = await api.get(`/episodes/v1/${animeId}/recent-video/`);
  console.log(result);
};
