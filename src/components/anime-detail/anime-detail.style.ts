import styled from 'styled-components';

export const S = {
  DetailContainer: styled.div`
    margin-top: 20px;
  `,

  ContentsContainer: styled.div`
    display: flex;
    gap: 146px;
    /* background-color: #4f4f4f; */
    @media screen and (max-width: 1219px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `,

  ContentsImg: styled.div`
    img {
      width: 464px;
      height: 662px;
      border-radius: 20px;
    }
  `,

  PreviewBox: styled.a`
    text-decoration: none;
    color: #ffffff;
    font-weight: 700;
    font-size: 20px;
    background-color: #8200ff;
    padding: 20px;
    border-radius: 10px;

    cursor: pointer;
  `,

  ContentsText: styled.p`
    line-height: 25px;
    margin-top: 40px;
  `,

  ContentsOptions: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
  `,

  LikeShareBox: styled.div`
    width: 113px;
    height: 56px;
    display: flex;
    align-items: flex-start;
    gap: 32px;
  `,

  LikeBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  ShareBox: styled.div`
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 45px;
    height: 56px;
  `,

  ContentsStar: styled.label`
    font-size: 20px;
    font-weight: 700;
    line-height: 150%; /* 30px */
  `,

  StarBox: styled.div`
    margin-top: 40px;
  `,

  ContentVideoLayout: styled.div`
    text-align: center;
    align-items: center;
  `,

  AniLabel: styled.p`
    font-family: 'Cafe24Ssurround';
    font-weight: 700;
    font-size: 44px;
    line-height: 52.8px;
    margin-bottom: 30px;
  `,

  DetailLabel: styled.p`
    font-weight: 700;
    font-size: 24px;
    margin-top: 100px;
    color: #8200ff;
    @media screen and (max-width: 1295px) {
      line-height: 32px;
    }
  `,

  AniDetailTagBox: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 1126px;
    gap: 5px;
    row-gap: 15px;
    margin: 10px 0px;
  `,

  AniDetailTag: styled.div`
    height: 26px;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    background-color: #ffebf7;
    display: inline-flex;
    font-size: 12px;
    padding: 4px 12px;
    gap: 8px;

    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.015em;
    text-align: left;
  `,

  NonPreview: styled.div`
    font-size: 14px;
    font-weight: 700;
    margin-top: 20px;
  `,
};

//반응형예시
// @media screen and (max-width: 600px) {
//   flex-direction: column;
//   align-items: flex-end;
// }
