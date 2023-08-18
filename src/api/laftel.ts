import api from "./index";
import { laftelParamsM } from "./../consts";
export const getAnimeList = async (laftelParams: laftelParamsM) => {
  const result = await api.get(`/search/v1/discover/?offset=0&size=10`, {
    params: { sort: laftelParams.sort, tags: laftelParams.tags },
  });
  console.log(result);
  return result!.data!.results!;
};

export const getAnimePreview = async (animeId: string) => {
  const result = await api.get(`/episodes/v1/${animeId}/recent-video/`);
  console.log(result);
};
