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
    gap: 4px;
    width: 100%;
    height: 100%;

    :hover img:not(.viewDetail) {
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
    width: 100%;
    height: 100%;
    cursor: pointer;
    @media (max-width: 540px) {
      width: 100%;
      height: 100%;
    }
  `,

  CardThumbnail: styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    @media (max-width: 540px) {
      width: 100%;
      height: 100%;
    }
  `,

  GenreText: styled.div`
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.015em;
    color: #000000;
  `,

  CardGenres: styled.div`
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
  Genre: styled.div`
    justify-content: center;
    align-items: center;
    padding: 4px 12px;
    height: 16px;
    background: #efefef;
    border-radius: 999px;
  `,
};
