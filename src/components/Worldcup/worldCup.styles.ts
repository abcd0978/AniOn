import styled from 'styled-components';

// ------------- 월드컵 공통
export const S = {
  WorldCupContainer: styled.div`
    // position: relative;
    /* display: flex; */
    //width: 1440px;
    //height: 999px;
    width: 100%;
    padding: 32px 0px;
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
    flex-shrink: 0;
    margin: 0 auto;
  `,

  WorldCupResultContainer: styled.div`
    width: 100%;
    display: flex;
    padding: 32px 0px;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: 768px) {
      width: 100%;
      flex-direction: column;
    }
  `,

  WorldCupContainer2: styled.div`
    /* display: flex; */
    width: 100%;
    padding: 32px 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    flex-shrink: 0;
    margin: 0 auto;
  `,

  WorldcupVS: styled.img`
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: 768px) {
      width: 43px;
      top: 36%;
    }
  `,

  WorldCupMainTitle: styled.p`
    color: var(--main-default, #8200ff);
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.48px;
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    p {
      font-size: 24px;
      font-weight: 400;
      line-height: 29px;
      letter-spacing: -0.015em;
      text-align: left;
      color: #000000;
    }

    @media (max-width: 768px) {
      font-size: 18px;

      p {
        font-size: 13px;
      }
    }
  `,

  WorldCupTestContainer: styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 35px;

    @media (max-width: 768px) {
      width: 100%;
      flex-direction: column;
      gap: 20px;
    }
  `,

  WorldCupRealTestContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 35px;
    @media (max-width: 768px) {
      width: 100%;
      height: 100%;
      flex-direction: column;
      gap: 20px;
    }
  `,

  WorldCupTest: styled.div`
    width: 40%;
    display: flex;
    height: 100%;
    padding: 35px;
    flex-direction: column;
    align-items: center;
    gap: 51px;
    border-radius: 32px;
    background: #fdfbff;
    /* Drop Shadow */
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
    border: 4px solid #fdfbff;

    &:hover {
      border: 4px solid #8200ff;
    }

    @media (max-width: 1280px) {
      padding: 20px;
    }

    @media (max-width: 768px) {
      width: 80%;
      height: 100%;
      gap: 27px;
    }
  `,

  WorldCupResultTest: styled.div`
    width: 100%;
    display: flex;
    padding: 40px;
    flex-direction: column;
    align-items: center;
    gap: 51px;
    border-radius: 32px;
    background: #fdfbff;
    /* Drop Shadow */
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      width: 80%;
      height: 100%;
      gap: 20px;
      padding: 20px 40px 20px 40px;
    }
  `,

  WorldCupUp: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: -2px;
    width: 100%;
    height: 100%;
  `,

  // WorldCupOnlyText: styled.div`
  //   align-items: center;
  // `,

  WordlcupInfo: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,

  WorldCupGender: styled.div`
    /* display: flex; */
    width: 25%;
    padding: 8px 12px;
    border-radius: 10px;
    background: var(--sub-1, #ff96db);
    color: #ffebf7;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    line-height: 150%; /* 27px */
    letter-spacing: -0.27px;
    margin-bottom: 12px;
    @media (max-width: 1280px) {
      font-size: 14px;
    }

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
    width: 100%;
    @media (max-width: 768px) {
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
    width: 100%;

    @media (max-width: 1280px) {
      font-size: 14px;
    }

    @media (max-width: 768px) {
      font-size: 15px;
    }
  `,
  WorldCupName: styled.p`
    color: #000;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    line-height: 150%; /* 42px */
    letter-spacing: -0.42px;
    width: 100%;

    @media (max-width: 1280px) {
      font-size: 20px;
    }

    @media (max-width: 768px) {
      font-size: 18px;
    }
  `,

  WorldCupImg: styled.div`
    margin-top: 32px;
    width: 80%;
    height: 80%;
    border-radius: 400px;

    @media (max-width: 768px) {
      margin-top: 0px;
      width: 53%;
      height: 100%;
    }
  `,

  CharacterImg: styled.img`
    width: 100%;
    height: 100%;
    border-radius: 400px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  `,

  //----------------------------------------------Test쪽
  WorldCupImgs: styled.div`
    margin-top: 32px;
    width: 80%;
    height: 80%;
    border-radius: 400px;
    position: relative;

    @media (max-width: 768px) {
      display: none;
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

    @media (max-width: 1024px) {
      width: 200px;
      font-size: 15px;
      padding: 12px 20px 12px 32px;
    }

    @media (max-width: 768px) {
      width: 318px;
      height: 50px;
      padding: 12px 20px 12px 32px;
      background: #8200ff;
    }

    // img {
    //   position: absolute;
    //   right: 28px;
    //   vertical-align: top;
    // }
  `,

  WorldCupTestPickButton: styled.button`
    display: flex;
    position: relative;
    width: 60%;
    justify-content: center;
    align-items: center;
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
    height: 67px;

    &:hover {
      background: #8200ff;
    }

    @media (max-width: 1280px) {
      height: 50px;
      font-size: 17px;
      font-weight: 400;
    }

    @media (max-width: 768px) {
      width: 211px;
      font-size: 15px;
      font-weight: 400;
      height: 40px;
    }
  `,

  WorldCupTestButtonTextBox: styled.div`
    display: flex;
    width: 100%;
    padding: 16px 20px 16px 32px;
    justify-content: center;
    align-items: center;
    gap: 12px;

    @media (max-width: 1024px) {
      padding: 12px 15px 12px 24px;
    }

    @media (max-width: 768px) {
      font-size: 15px;
      padding: 0;
      gap: 3px;
    }
  `,

  //----메인 카드
  // WorldCupMainTestCard: styled.div<{ height: number }>`
  WorldCupMainTestCard: styled.div`
    width: 35%;
    display: flex;
    // height: 45rem;
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

    @media (max-width: 768px) {
      width: 80%;
      height: 100%;
      gap: 34px;
    }
  `,

  WorldcupWinnerContainer: styled.div`
    width: 38%;
    height: 100%;
    @media (max-width: 768px) {
      width: 100%;
    }
  `,
};
