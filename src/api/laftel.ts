import api from "./index";
import { laftelParamsM } from "./../consts";
import { isPropertyAccessOrQualifiedName } from "typescript";
export const getAnimeList = async (laftelParams: laftelParamsM) => {
  const result = await api.get(`/search/v1/discover/?offset=0&size=10`, {
    params: { sort: laftelParams.sort, tags: laftelParams.tags },
  });
  console.log(result);
  return result!.data!.results!;
};

export const getAnimePreview = async (animeId: string) => {
  const result = await api.get(`/episodes/v1/${animeId}/recent-video/`);
  // console.log(result);
  return result.data;
};

//애니 상세 내용 가져오기
export const getAnimeById = async (animeId: string) => {
  const result = await api.get(`/items/v2/${animeId}/`);
  // console.log(result);
  return result!.data!;
};
