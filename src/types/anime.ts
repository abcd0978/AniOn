export interface AnimeG {
  tags: any;
  id: number;
  name: string;
  img?: string;
  images?: {
    crop_ratio: string;
    img_url: string;
    option_name: string;
  }[];
  genres?: string[];
}
export type recommendType = 'history' | 'week' | 'quarter';

export interface laftelParamsM {
  sort?: 'rank' | 'name' | 'recent' | 'cnt_eval' | 'avg_rating';
  genres?: (
    | 'SF'
    | '개그'
    | '공포'
    | '드라마'
    | '로맨스'
    | '모험'
    | '무협'
    | '미스터리'
    | '범죄'
    | '성인'
    | '스릴러'
    | '스포츠'
    | '시대물'
    | '아동'
    | '아이돌'
    | '액션'
    | '음식'
    | '음악'
    | '이세계'
    | '일상'
    | '재난'
    | '추리'
    | '치유'
    | '특촬'
    | '판타지'
    | '하렘'
    | 'BL'
    | 'GL 백합'
  )[];
  tags?: (
    | '가족'
    | '감동'
    | '게임'
    | '동물'
    | '동양풍'
    | '두뇌싸움'
    | '로봇'
    | '루프물'
    | '마법소녀'
    | '먼치킨'
    | '무거움'
    | '배틀'
    | '뱀파이어'
    | '복수'
    | '삼각관계'
    | '서양풍'
    | '선생님'
    | '성별전환'
    | '성장'
    | '슬픔'
    | '시간여행'
    | '역하렘'
    | '연예인'
    | '열혈'
    | '오타쿠'
    | '요괴 및 괴물'
    | '육아'
    | '정치'
    | '좀비'
    | '주체적 여성'
    | '짝사랑'
    | '철학'
    | '퇴마'
    | '학교'
  )[];
  years?:
    | '2023년 3분기'
    | '2023년 2분기'
    | '2023년 1분기'
    | '2022년 4분기'
    | '2022년 3분기'
    | '2022년 2분기'
    | '2022년 1분기'
    | '2021년'
    | '2020년'
    | '2019년'
    | '2018년'
    | '2017년'
    | '2016년'
    | '2015년'
    | '2014년'
    | '2013년'
    | '2012년'
    | '2011년'
    | '2010년'
    | '2000년대'
    | '2000년대 이전'
    | null;
  viewable?: true | false;
  ending?: 'false' | null;
  medium?: ('TVA' | '극장판' | 'OVA')[];
  offset?: number;
  size?: number;
  keyword?: string;
}

// genres enum
enum Genres {
  'SF' = 'SF',
  '개그' = '개그',
  '공포' = '공포',
  '드라마' = '드라마',
  '로맨스' = '로맨스',
  '모험' = '모험',
  '무협' = '무협',
  '미스터리' = '미스터리',
  '범죄' = '범죄',
  '성인' = '성인',
  '스릴러' = '스릴러',
  '스포츠' = '스포츠',
  '시대물' = '시대물',
  '아동' = '아동',
  '아이돌' = '아이돌',
  '액션' = '액션',
  '음식' = '음식',
  '음악' = '음악',
  '이세계' = '이세계',
  '일상' = '일상',
  '재난' = '재난',
  '추리' = '추리',
  '치유' = '치유',
  '특촬' = '특촬',
  '판타지' = '판타지',
  '하렘' = '하렘',
  'BL' = 'BL',
  'GL 백합' = 'GL 백합',
}

// years enum
enum Years {
  '2023년 3분기' = '2023년 3분기',
  '2023년 2분기' = '2023년 2분기',
  '2023년 1분기' = '2023년 1분기',
  '2022년 4분기' = '2022년 4분기',
  '2022년 3분기' = '2022년 3분기',
  '2022년 2분기' = '2022년 2분기',
  '2022년 1분기' = '2022년 1분기',
  '2021년' = '2021년',
  '2020년' = '2020년',
  '2019년' = '2019년',
  '2018년' = '2018년',
  '2017년' = '2017년',
  '2016년' = '2016년',
  '2015년' = '2015년',
  '2014년' = '2014년',
  '2013년' = '2013년',
  '2012년' = '2012년',
  '2011년' = '2011년',
  '2010년' = '2010년',
  '2000년대' = '2000년대',
  '2000년대 이전' = '2000년대 이전',
}

export { Genres, Years };
