import styled from 'styled-components';

type Props = {
  $isCollapse: boolean;
};

export const S = {
  DetailContainer: styled.div<Props>`
    display: flex;
    // padding: 45px 240px 129px 240px;
    // gap: 50px;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #4f4f4f;
    justify-content: space-evenly;
  `,

  ContentsContainer: styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    width: 55%;

    @media (max-width: 1024px) {
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `,

  ContentsBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    width: 100%;

    @media (max-width: 768px) {
      gap: 10px;
    }
  `,

  ContentsImg: styled.div`
    margin-top: 20px;
    width: 350px;
    img {
      width: 100%;
      border-radius: 20px;
    }

    @media (max-width: 1024px) {
      display: none;
    }
  `,

  MobileContentsImg: styled.div`
    display: none;

    @media (max-width: 1024px) {
      display: none;

      img {
        width: 40%;
        // height: 188px;
        border-radius: 10px;
      }
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

    @media (max-width: 768px) {
      padding: 8px 16px 8px 8px;
      font-size: 16px;
    }
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
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.24px;
  `,

  ContentsEx: styled.p<Props>`
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.24px;
    width: 100%;

    height: ${(props) => (props.$isCollapse ? '100%' : '70%')};

    flex-shrink: 0;

    @media (max-width: 768px) {
      font-size: 15px;
    }
  `,

  ContentsOptions: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    img {
      cursor: pointer;
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  `,

  PreviewLike: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;

    @media (max-width: 1024px) {
      flex-direction: column;
      gap: 13px;
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

    height: 132px;

    @media (max-width: 768px) {
      justify-content: unset;
    }
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
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
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

    @media (max-width: 768px) {
      font-size: 24px;
    }
  `,

  DetailLabel: styled.p`
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 24px;
    margin-top: 100px;
    color: #8200ff;
    gap: 7px;

    p {
      font-size: 13px;
      color: #ffa8dc;
      font-weight: 600;
    }

    @media (max-width: 1295px) {
      line-height: 32px;
    }

    @media (max-width: 768px) {
      p {
        font-size: 11px;
      }
      margin-top: 69px;
    }
  `,

  AniTextLayoutTop: styled.div`
    display: flex;
    width: 100%;
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
    max-width: 90%;
    gap: 5px;
    row-gap: 15px;
    margin: 10px 0px;
    width: 100%;
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

    @media (max-width: 1024px) {
      padding: 3px 6px;
      font-size: 13px;
    }

    @media (max-width: 768px) {
      font-size: 13px;
    }
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

  ContentSeeMore: styled.div`
    margin-top: 8px;
    cursor: pointer;
    display: flex;
    gap: 8px;
  `,
};

//반응형예시
// @media  (max-width: 600px) {
//   flex-direction: column;
//   align-items: flex-end;
// }
