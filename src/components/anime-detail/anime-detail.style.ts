import { tSTypeAliasDeclaration } from '@babel/types';
import styled from 'styled-components';

export const S = {
  DetailContainer: styled.div`
    display: flex;
    // padding: 93px 240px 60px 240px;
    padding: 93px 240px 129px 240px;
    align-items: flex-start;
    gap: 146px;
    width: 100vw;
    height: 662px;
    margin-left: calc(-50vw + 50%);
    background: #4f4f4f;
  `,

  ContentsContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    height: 627px;
    weight: 830px;

    // @media screen and (max-width: 1219px) {
    //   display: flex;
    //   flex-direction: column;
    //   align-items: center;
    // }
  `,

  ContentsBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    width: 830px;
    height: 983px;
  `,

  ContentsImg: styled.div`
    img {
      width: 464px;
      height: 662px;
      border-radius: 20px;
    }
  `,

  PreviewBox: styled.a`
    display: flex;
    padding: 16px 16px 16px 8px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 10px;
    background: #a649ff;
    cursor: pointer;

    color: #fff;
    /* 소타이틀/1 */
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.3px;
  `,

  ContentsText: styled.p`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  `,

  ContentsTextUp: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  `,

  ContentsGenrePro: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    color: #fff;
    /* 본문/2 */
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.24px;
  `,

  ContentsEtc: styled.p`
    color: #fff;
    /* 본문/1 */
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.24px;
  `,

  ContentsEx: styled.p`
    color: #fff;
    /* 본문/2 */
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.24px;
    width: 830px;
    flex-shrink: 0;
  `,

  ContentsOptions: styled.div`
    display: flex;
    width: 829px;
    justify-content: space-between;
    align-items: flex-start;
    img {
      cursor: pointer;
    }
  `,

  LikeShareBox: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 32px;
    width: 116px;
    height: 57px;
  `,

  LikeBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 36px;
    height: 57px;

    p {
      color: #fff;
      /* 최소 */
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.21px;
    }
  `,

  ShareBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 48px;
    height: 57px;

    p {
      color: #fff;
      /* 최소 */
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.21px;
    }
  `,

  ContentsStarTitleBox: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
  `,

  ContentsStarLabel: styled.label`
    color: #fff;
    /* 소타이틀/1 */
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.3px;
  `,

  ContentsStarCount: styled.p`
    color: #fff;
    /* 최소 */
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.21px;
  `,

  TotlaStarBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 160px;
    align-self: stretch;
    width: 830px;
    height: 132px;
  `,

  StarNumBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 192px;
    height: 86px;

    p {
      color: #fff;
      /* 중타이틀/1 */
      font-size: 28px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 42px */
      letter-spacing: -0.42px;
    }
  `,

  // RealStar: styled.div`
  //   display: flex;
  //   align-items: flex-start;
  //   gap: 8px;
  //   height: 32px;
  // `,

  StarBox: styled.div`
    display: flex;
    width: 830px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    height: 176px;
  `,

  ContentVideoLayout: styled.div`
    text-align: center;
    align-items: center;
  `,

  AniLabel: styled.p`
    font-family: 'Cafe24Ssurround';
    font-weight: 700;
    font-size: 44px;
    color: #fff;
    font-style: normal;
    line-height: normal;
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

  AniTextLayoutTop: styled.div`
    display: flex;
    width: 830px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  `,

  AniTextLayoutToptoTop: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
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
    background: #f4f4f4;
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
  ReviewContainer: styled.div`
    display: flex;
    padding: 60px 240px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    background: #fdfbff;
  `,
};

//반응형예시
// @media screen and (max-width: 600px) {
//   flex-direction: column;
//   align-items: flex-end;
// }
