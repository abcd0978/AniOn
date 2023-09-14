import api from './index';
import { laftelParamsM, recommendType } from './../types/anime';

export const fetchAnimeList = async (laftelParams: laftelParamsM) => {
  console.log(laftelParams);
  if (laftelParams.keyword) {
    const result = await api.get(`/search/v3/keyword/?viewing_only=false&`, {
      params: {
        keyword: laftelParams.keyword,
        offset: laftelParams.offset,
        size: laftelParams.size,
      },
    });

    return {
      animeList: result!.data!.results!, // 애니 리스트
      isNextPage: result.data.next ? true : false, // 다음 페이지 유무
      count: result.data.count, // 필터링된 애니 개수
    };
  }

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
      years: laftelParams.years,
      ending: laftelParams.ending,
    },
  });
  return {
    animeList: result!.data!.results!, // 애니 리스트
    isNextPage: result.data.next ? true : false, // 다음 페이지 유무
    count: result.data.count, // 필터링된 애니 개수
  };
};

// 검색 API
// https://laftel.net/api/search/v3/keyword/?keyword=%EB%82%98&viewing_only=true&offset=0&size=24
export const fetchSearchedAnime = async (laftelParams: laftelParamsM) => {
  const result = await api.get(`/search/v3/keyword/?`, {
    params: {
      keyword: laftelParams.keyword,
      offset: laftelParams.offset,
      size: laftelParams.size,
    },
  });

  return {
    animeList: result!.data!.results!, // 애니 리스트
    isNextPage: result.data.next ? true : false, // 다음 페이지 유무
    count: result.data.count, // 필터링된 애니 개수
  };
};

// preview (1화 3분)
export const getAnimePreview = async (animeId: string) => {
  const result = await api.get(`/episodes/v1/${animeId}/recent-video/`);
  return result.data;
};

// 애니 상세 내용 가져오기
export const getAnimeById = async (animeId: string) => {
  const result = await api.get(`/items/v2/${animeId}/`);
  return result!.data!;
};

// 메인 페이지
export const getAnimeRankings = async (type: recommendType) => {
  const result = await api.get(`/home/v1/recommend/ranking?size=10`, {
    params: {
      type: type,
    },
  });
  return result.data.slice(0, 10) as any[];
};

// 라프텔 상세 별점 가져오기
export const getAnimeStars = async (animeId: string) => {
  const result = await api.get(`/items/v1/${animeId}/statistics/`);
  return result.data;
};

export const fetchAnimeRecommend = async () => {
  const result = await api.post(`/home/v2/recommend/5/`);
  const filteredData = result.data
    .filter((item: { name: string | string[] }) => {
      return !(item.name.includes('라프텔') || item.name.includes('판권'));
    })
    .slice(0, 3);
  return filteredData;
};
