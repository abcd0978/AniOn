import styled from 'styled-components';

export const HoverInfo = styled.div`
  display: none;
  position: absolute;
  top: 0px;
  z-index: 20;
  line-height: 25px;
  color: #ffffff;
  height: 90%;
  width: 86%;
  padding: 16px;
`;

export const S = {
  PageNameDiv: styled.div`
    margin-top: 30px;
  `,

  PageNameSpan: styled.span`
    color: #8200ff;
    font-size: 32px;
    font-weight: 400;
  `,
  PageNameBold: styled.span`
    color: #8200ff;
    font-size: 32px;
    font-weight: 700;
    line-height: 48px;
  `,

  AnimeContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 24px;
    row-gap: 40px;

    @media (max-width: 1600px) {
      /* 화면 크기가 1600px 이하인 경우 */
      grid-template-columns: repeat(5, 1fr); /* 3개의 컬럼으로 변경 */
    }

    @media (max-width: 1280px) {
      /* 화면 크기가 1280px 이하인 경우 */
      grid-template-columns: repeat(4, 1fr); /* 3개의 컬럼으로 변경 */
    }

    @media (max-width: 1024px) {
      /* 화면 크기가 1024px 이하인 경우 */
      grid-template-columns: repeat(3, 1fr); /* 3개의 컬럼으로 변경 */
    }

    @media (max-width: 800px) {
      /* 화면 크기가 800px 이하인 경우 */
      grid-template-columns: repeat(2, 1fr); /* 2개의 컬럼으로 변경 */
    }

    @media (max-width: 480px) {
      /* 화면 크기가 800px 이하인 경우 */
      grid-template-columns: repeat(1, 1fr); /* 2개의 컬럼으로 변경 */
    }
  `,

  // 이 아래로 카드
  CardDiv: styled.div`
    position: relative; // hover 요소들을 absolute로 사용하기 위해 사용
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
    width: 100%;
    height: 100%;

    :hover img:not(.viewDetail) {
      -webkit-transition: 0.3s ease-in-out;
      transition: 0.3s ease-in-out;
      filter: brightness(0.2);
    }

    :hover ${HoverInfo} {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  `,

  HoverDiv: styled.div`
    position: relative;
  `,

  HoverGenre: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin: 15px 15px 0px 0px; */
    max-width: 60px;
    padding: 4px 8px;
    height: 16px;
    background: #f3e7ff;
    border-radius: 999px;
  `,

  HoverTitleAndDetail: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    align-items: center;
  `,

  HoverTitle: styled.div`
    /* margin-top: 10px; */
    /* margin-left: 25px; */
    width: 100%;
    height: 100px;
    font-weight: 700;
    font-size: 24px;
    line-height: 34px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `,
  // 애니메이션 제목
  //  wordWrap: 'break-word'

  HoverViewDetail: styled.button`
    display: flex;
    align-items: center;
    position: relative;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid white;
    background-color: rgba(255, 255, 255, 0);
    color: white;
    cursor: pointer;
    p {
      margin-left: 12px;
    }
  `,

  HoverLikeBox: styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    gap: 3px;
    right: 16px;
    bottom: 16px;
  `,

  CardInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 220px;
    height: 347px;
    cursor: pointer;
  `,

  CardThumbnail: styled.img`
    width: 220px;
    height: 320px;
    border-radius: 10px;
  `,

  CardTitle: styled.div`
    width: 220px;
    height: 19px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  CardGenres: styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
    width: 100%;
    height: 20px;
    margin: 8px 8px 0px 0px;
    flex: none;
    order: 1;
    flex-grow: 0;
  `,

  Genre: styled.div`
    justify-content: center;
    align-items: center;
    padding: 4px 12px;
    height: 16px;
    background: #efefef;
    border-radius: 999px;
  `,

  GenreText: styled.div`
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.015em;
    color: #000000;
  `,

  Target: styled.div`
    height: 1px;
    position: relative;
    transform: translateY(-100%);
  `,
};
