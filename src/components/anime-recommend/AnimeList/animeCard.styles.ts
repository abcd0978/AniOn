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
  CardDiv: styled.div`
    position: relative; // hover 요소들을 absolute로 사용하기 위해 사용
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 100%;
    height: 100%;

    :hover img:not(.viewDetail, .review) {
      -webkit-transition: 0.3s ease-in-out;
      transition: 0.3s ease-in-out;
      filter: brightness(0.3);
    }

    :hover ${HoverInfo} {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  `,

  HoverDiv: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `,

  HoverGenre: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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

  HoverViewDetail: styled.button`
    display: flex;
    align-items: center;
    position: relative;
    padding: 6px 12px;
    border-radius: 999px;
    border: none;
    background-color: #8200ff;
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
    gap: 6px;
    right: 16px;
    bottom: 16px;
  `,

  HoverCountDisplay: styled.div`
    display: flex;
    gap: 2px;
    align-items: flex-end;
  `,

  CardInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    @media (max-width: 540px) {
      width: 100%;
      height: 100%;
    }
  `,

  CardThumbnail: styled.img`
    aspect-ratio: 1/1.5;
    width: 100%;
    /* height: 100%; */
    border-radius: 10px;
  `,

  GenreText: styled.div`
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.015em;
    color: #000000;
  `,

  AnimeInfo: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,

  CardTitle: styled.div`
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  CardGenres: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
    width: 100%;
    height: 20px;
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
};
