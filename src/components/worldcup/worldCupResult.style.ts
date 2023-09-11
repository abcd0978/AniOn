import styled from 'styled-components';

export const R = {
  //-----------------------------------------------Result쪽
  WorldCupWinnerImg: styled.div`
    margin-top: 20px;
    width: 440px;
    height: 440px;
    flex-shrink: 0;
    border-radius: 440px;
    background: #d9d9d9;

    img {
      position: relative;
      width: 440px;
      height: 440px;
      border-radius: 440px;
    }
    @media (max-width: 768px) {
      width: 55%;
      height: 90%;
      aspect-ratio: 1;
      margin-top: 0px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  `,
  WorldCupWinnerCard: styled.div`
    display: flex;
    width: 584px;
    height: 746px;
    padding: 40px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 100px;

    @media (max-width: 768px) {
      width: 80%;
      height: 100%;
      align-items: none;
      padding: 10px 0px 0px 10px;
    }
  `,

  WorldCupResultText: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    margin-top: 32px;
    margin-bottom: 72px;
    @media (max-width: 768px) {
      height: 10%;
      margin: 10px 0px 0px 0px;
    }
  `,

  WorldCupResultButtonBox: styled.div`
    width: 673px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    gap: 20px;
    // margin-top: 32px;

    @media (max-width: 768px) {
      width: 100%;
      margin-top: 0px;
      gap: 5px;
    }
  `,

  WorldCupResultUp: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: -2px;
    width: 100%;
    height: 80%;
  `,

  WorldCupResultButton: styled.button<{ background: string }>`
    background: ${(props) => props.background || '#838383'};
    position: relative;
    display: flex;
    width: 160px;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 999px;
    border: none;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.24px;
    cursor: pointer;
    color: ${(props) => props.color || '#000000'};

    img {
      position: absolute;
      right: 2px;
      vertical-align: top;
    }

    @media (max-width: 768px) {
      width: 50%;
      font-size: 13px;
      padding: 11px 20px;

      img {
        width: 22px;
      }
    }
  `,

  ResultBox: styled.div`
    width: 792px;
    @media (max-width: 768px) {
      width: 100%;
    }
  `,

  ResultCardBox: styled.div`
    margin-top: 71px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    @media (max-width: 768px) {
      margin-top: 20px;
    }
  `,

  ResultRankTitle: styled.div`
    width: 126px;
    height: 32px;
    color: #000;
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
  `,
  ResultRankTop: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 24px;

    @media (max-width: 768px) {
      flex-direction: row;
    }
  `,

  ResultTopCard: styled.div`
    display: flex;
    width: 248px;
    height: 177px;
    padding: 20px 0px;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
    border-radius: 32px;
    background: #fff;
    /* Drop Shadow */
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      flex-direction: column;
      width: 101px;
      border-radius: 21px;
    }
  `,

  TopImgRankBox: styled.div`
    width: 248px;
  `,

  ResultTopCardImg: styled.img`
    width: 80px;
    height: 80px;
    fill: #d9d9d9;
    border-radius: 440px;
    background: #d9d9d9;
    // @media (max-width: 768px) {
    //   width: 100%;
    // }
  `,

  ResultRankNum: styled.div`
    width: 17px;
    position: absolute;
    margin-left: 15px;
    color: #000;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 150%; /* 30px */
    letter-spacing: -0.3px;

    @media (max-width: 768px) {
      margin-left: 76px;
      font-size: 17px;
      margin-top: -18px;
    }
  `,

  ResultTopTextBox: styled.div`
    width: 100%;
    height: 89px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  `,

  ResultAniText: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  // 말줄임표 or 줄 넘기기
  ResultTopTextAni: styled.p`
    width: 80%;
    color: #000;
    font-size: 16px;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.24px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      font-size: 13px;
    }
  `,

  ResultTopTextCha: styled.p`
    color: #000;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 150%; /* 30px */
    letter-spacing: -0.3px;

    @media (max-width: 768px) {
      font-size: 15px;
    }
  `,

  OtherRankContainer: styled.div`
    width: 792px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    /* max-height: 100px; */
    @media (max-width: 768px) {
      width: 100%;
    }
  `,

  OtherRankBox: styled.div`
    display: flex;
    width: 792px;
    align-items: center;
    gap: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #d9d9d9;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,

  otherRankImg: styled.img`
    width: 60px;
    height: 60px;
    fill: #d9d9d9;
    border-radius: 440px;
    background: #d9d9d9;
  `,

  otherRankTextBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1 0 0;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 5px;
    }
  `,

  otherRankText: styled.div`
    display: flex;
    gap: 8px;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align-last: left;
      gap: 0px;
    }
  `,

  otherRankName: styled.p`
    color: #000;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 150%; /* 24px */
    letter-spacing: -0.24px;
  `,

  otherRankAni: styled.p`
    color: #000;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.24px;
  `,
};
