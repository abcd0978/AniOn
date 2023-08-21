import api from './index';
import { laftelParamsM } from './../consts';
export const getAnimeList = async (laftelParams: laftelParamsM) => {
  // 배열 형태로 받기 때문에 ,단위로 join을 해준다.
  // const genresParam = laftelParams.genres ? laftelParams.genres.join(',') : '';
  // const tagsParam = laftelParams.tags ? laftelParams.tags.join(',') : '';

  // const result = await api.get(`/search/v1/discover/?offset=0&size=10`, {
  //   params: {
  //     sort: laftelParams.sort,
  //     tags: tagsParam,
  //     genres: genresParam,
  //   },
  // });
  // return result!.data!.results!;
  return laftelParams;
};

export const getAnimePreview = async (animeId: string) => {
  const result = await api.get(`/episodes/v1/${animeId}/recent-video/`);
  console.log(result);
};
