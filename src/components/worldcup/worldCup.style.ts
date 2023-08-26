import styled from 'styled-components';

export const S = {
  WorldCupContainer: styled.div`
    display: flex;
    width: 1440px;
    height: 999px;
    padding: 32px 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    flex-shrink: 0;
    margin: 0 auto;
  `,

  WorldCupMainTitle: styled.p`
    color: #000;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.48px;
  `,

  WorldCupTestContainer: styled.div`
    display: flex;
    width: 1440px;
    justify-content: space-between;
    align-items: center;
    margin-top: 35px;
  `,

  WorldCupTest: styled.div`
    display: flex;
    height: 816px;
    padding: 40px;
    flex-direction: column;
    align-items: center;
    gap: 100px;
    border-radius: 32px;
    background: #fff;
    /* Drop Shadow */
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  `,

  WorldCupUp: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  `,

  WorldCupGender: styled.div`
    display: flex;
    width: 100px;
    padding: 8px 16px;
    border-radius: 10px;
    background: #d9d9d9;
    color: #000;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    line-height: 150%; /* 27px */
    letter-spacing: -0.27px;
    margin-bottom: 12px;
  `,

  WorldCupTitles: styled.p`
    color: #000;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    line-height: 150%; /* 36px */
    letter-spacing: -0.36px;
    width: 600px;
  `,

  WorldCupTitle: styled.p`
    color: #000;
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    line-height: 150%; /* 36px */
    letter-spacing: -0.36px;
    width: 600px;
  `,
  WorldCupName: styled.p`
    color: #000;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    line-height: 150%; /* 42px */
    letter-spacing: -0.42px;
    width: 600px;
  `,

  WorldCupImg: styled.div`
    margin-top: 32px;
    width: 400px;
    height: 400px;
    border-radius: 400px;
    background: #d9d9d9;

    img {
      position: relative;
      width: 400px;
      height: 400px;
      border-radius: 400px;
    }
  `,
  //------------------------------------------
  WorldCupImgs: styled.div`
    margin-top: 32px;
    width: 400px;
    height: 400px;
    border-radius: 400px;
    background: #d9d9d9;

    img {
      position: relative;
      left: 169px;
      top: 140px;
    }
  `,
  WorldCupTestButton: styled.button`
    display: flex;
    width: 278px;
    padding: 16px 20px 16px 32px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 999px;
    background: #838383;
    color: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    line-height: 150%; /* 30px */
    letter-spacing: -0.3px;
    cursor: pointer;
  `,
  //------------------------------------------
  WorldCupWinnerImg: styled.div`
    margin-top: 72px;
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
  `,

  WorldCupResultText: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    margin-top: 32px;
    margin-bottom: 72px;
  `,

  WorldCupResultButtonBox: styled.div`
    width: 710px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    gap: 20px;
  `,
};
