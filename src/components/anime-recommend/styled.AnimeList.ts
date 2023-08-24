import styled from 'styled-components';

export const HoverInfo = styled.div`
  display: none;
  position: absolute;
  top: 5px;
  left: 5px;
  padding: 3px;
  z-index: 20;
  line-height: 25px;
  color: #fff;
`;

export const S = {
  AnimeContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    row-gap: 15px;

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
  `,

  // 이 아래로 카드
  CardDiv: styled.div`
    position: relative; // hover 요소들을 absolute로 사용하기 위해 사용
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
    width: 220px;
    height: 400px;
    :hover img {
      -webkit-transition: 0.3s ease-in-out;
      transition: 0.3s ease-in-out;
      filter: brightness(0.3);
    }

    :hover ${HoverInfo} {
      display: block;
      gap: 5px;
    }
  `,

  HoverTitle: styled.div`
    margin-top: 20px;
    font-weight: 600;
    font-size: 17px;
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
    margin: 0px 5px 10px 0px;
    flex: none;
    order: 1;
    flex-grow: 0;
  `,

  Genre: styled.div`
    display: flex;
    flex-direction: row;
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
