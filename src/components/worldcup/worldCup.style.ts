import styled from 'styled-components';

// ------------- 월드컵 공통
export const S = {
  WorldCupContainer: styled.div`
    // position: relative;
    /* display: flex; */
    //width: 1440px;
    //height: 999px;
    padding: 32px 0px;
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
    flex-shrink: 0;
    margin: 0 auto;
  `,

  WorldCupResultContainer: styled.div`
    // position: relative;
    display: flex;
    //width: 1440px;
    height: 999px;
    padding: 32px 0px;
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
    flex-shrink: 0;
    margin: 0 auto;
  `,

  WorldCupContainer2: styled.div`
    /* display: flex; */
    //width: 1440px;
    padding: 32px 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    flex-shrink: 0;
    margin: 0 auto;

    @media (max-width: 768px) {
      width: 75%;
    }
  `,

  WorldcupVS: styled.img`
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

  WorldCupMainTitle: styled.p`
    color: var(--main-default, #8200ff);
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.48px;
    margin-bottom: 32px;
  `,

  WorldCupTestContainer: styled.div`
    display: flex;

    justify-content: space-between;
    align-items: center;
    margin-top: 35px;
    @media (max-width: 768px) {
      width: 100%;
      // height: 100px;
      flex-direction: column;
      gap: 20px;
    }
  `,

  WorldCupRealTestContainer: styled.div`
    display: flex;
    /* width: 1440px; */
    justify-content: space-between;
    align-items: center;
    margin-top: 35px;
  `,

  WorldCupTest: styled.div<{ height: number }>`
    width: 600px;
    display: flex;
    height: ${(props) => props.height}px;
    padding: 40px;
    flex-direction: column;
    align-items: center;
    gap: 51px;
    border-radius: 32px;
    background: #fdfbff;
    /* Drop Shadow */
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    transform: scale(1);
    transition: transform 0.3s ease-in-out;

    &:hover {
      /* 호버 상태일 때 크게 확대 */
      transform: scale(1.1);
    }
  `,

  WorldCupResultTest: styled.div<{ height: number }>`
    width: 600px;
    display: flex;
    height: ${(props) => props.height}px;
    padding: 40px;
    flex-direction: column;
    align-items: center;
    gap: 51px;
    border-radius: 32px;
    background: #fdfbff;
    /* Drop Shadow */
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    @media (max-width: 768px) {
      width: 200px;
      height: 450px;
    }
  `,

  WorldCupUp: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: -2px;
  `,

  WorldCupGender: styled.div`
    display: flex;
    width: 81px;
    padding: 8px 16px;
    border-radius: 10px;
    background: var(--sub-1, #ff96db);
    color: #ffebf7;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    line-height: 150%; /* 27px */
    letter-spacing: -0.27px;
    margin-bottom: 12px;
    @media (max-width: 768px) {
      width: 50px;
      font-size: 11px;
    }
  `,

  WorldCupTitles: styled.p`
    color: #000;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    line-height: 150%; /* 36px */
    letter-spacing: -0.36px;
    width: 600px;
    @media (max-width: 768px) {
      width: 200px;
      font-size: 20px;
    }
  `,

  WorldCupTitleBox: styled.div`
    margin-top: 20px;
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

  //----------------------------------------------Test쪽
  WorldCupImgs: styled.div`
    margin-top: 32px;
    width: 400px;
    height: 400px;
    border-radius: 400px;
    position: relative;

    @media (max-width: 768px) {
      width: 200px;
      height: 200px;
      font-size: 10px;
    }
  `,

  WorldCupStartImg: styled.img`
    width: 100%;
  `,

  WorldCupTestButton: styled.button<{ width: number }>`
    display: flex;
    position: relative;
    width: ${(props) => props.width}px;
    padding: 16px 20px 16px 32px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 999px;
    background: #ff96db;
    color: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    line-height: 150%; /* 30px */
    letter-spacing: -0.3px;
    cursor: pointer;
    border: none;
    height: 75px;

    &:hover {
      background: #8200ff;
    }

    @media (max-width: 768px) {
      width: 200px;
      padding: 12px 20px 12px 32px;
    }

    // img {
    //   position: absolute;
    //   right: 28px;
    //   vertical-align: top;
    // }
  `,

  WorldCupTestPickButton: styled.button<{ width: number }>`
    display: flex;
    position: relative;
    width: ${(props) => props.width}px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 999px;
    background: #ff96db;
    color: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    line-height: 150%; /* 30px */
    letter-spacing: -0.3px;
    cursor: pointer;
    border: none;
    height: 75px;

    &:hover {
      background: #8200ff;
    }
  `,

  WorldCupTestButtonTextBox: styled.div`
    display: flex;
    width: 278px;
    padding: 16px 20px 16px 32px;
    justify-content: center;
    align-items: center;
    gap: 12px;

    @media (max-width: 768px) {
      font-size: 15px;
      justify-content: center;
      align-items: center;
      display: flex;
      padding: 0;
      gap: 3px;
    }
  `,
};
