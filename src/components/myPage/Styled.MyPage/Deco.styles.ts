import styled from 'styled-components';
export const D = {
  Page: styled.div`
    margin-top: -700px;
    margin-left: 450px;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-contents: center;
      margin-left: 10px;
      margin-top: -20px;
    }
  `,
  Title: styled.div`
    width: 200px;
    height: 32px;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  `,
  Container: styled.div`
    display: grid;
    flex-direction: column;
    @media (max-width: 768px) {
      justify-content: center;
    }
  `,
  ButtonContainer: styled.div`
    display: flex;
  `,
  Button: styled.button`
    border: none;
    width: 100px;
    height: 36px;
    font-size: 13px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 3px;
    font-size: 13px;
    border-radius: 999px;
    font-weight: bold;
    cursor: pointer;
    @media (max-width: 768px) {
      width: 72px;
      height: 28px;
    }
  `,
};
export const B = {
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px 1px;
    left: -5vw;
    top: 3vh;
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `,
  BorderContainer: styled.div``,
  BorderImg: styled.img`
    width: 150px;
    height: auto;
    object-fit: cover;
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    @media (max-width: 768px) {
      width: 120px;
    }
  `,
  ButtonContainer: styled.div`
    justify-content: space-between;
    width: 100px;
    align-items: center;
    margin-left: 25px;
  `,
  BorderName: styled.div`
    width: 100%;
    height: 20%;
    background-color: white;
    margin-top: 5px;
    line-height: 25px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  `,
  BorderPage: styled.div`
    position: absolute;
    justify-content: center;
    top: 240px;
    right: 400px;
    @media (max-width: 768px) {
      top: 360px;
      right: 160px;
    }
  `,

  BorderLoading: styled.div`
    margin-left: 500px;
  `,
  NoneContainer: styled.div`
    display: grid;
    align-items: center;

    justify-content: center;
    margin-left: 200%;
    margin-top: 80%;
  `,
  GoIcon: styled.img`
    width: 50%;
    height: auto;
    object-fit: cover;
    margin: 10px;
  `,
  NoneMessage: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  `,
  NoneButton: styled.div`
    background-color: #8200ff;
    color: #fff;
    width: 226.5px;
    height: 48px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    cursor: pointer;
  `,

  Equip: styled.button<{ is_equipped: boolean }>`
    position: RELATIVE;
    font-size: 14px;
    padding: 0px;8px;
    left: 100px;
    top: -30px;
    width: 80px;
    height: 30px;
    background-color: ${(props) => (props.is_equipped ? '#F3E7FF' : 'white')};
    color:black;
    border-radius: 6px;
    @media (max-width: 768px) {
      width: 48px; 
      font-size: 14px;

    }
    border: ${(props) =>
      props.is_equipped ? '1px solid #c88fff' : '1px solid #d9d9d9'};
    cursor: pointer;
    &:hover {
      ${(props) =>
        !props.is_equipped &&
        `
        background-color: ${props.is_equipped ? '#F3E7FF' : 'white'};
        color: black;
      `}
  
      &:disabled:hover {
        cursor: not-allowed;
      }
      
  `,
};
export const A = {
  Page: styled.div``,
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    margin-top: 10px;
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
  `,
  AwardImage: styled.img`
    width: 240px;

    @media (max-width: 768px) {
      width: 170px;
    }
  `,
  Loading: styled.div`
    margin-left: 500px;
  `,

  NoneMessage: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  `,
  NoneContainer: styled.div`
    display: grid;
    align-items: center;

    justify-content: center;
    margin-left: 200%;
    margin-top: 75%;
  `,
  NoneButton: styled.div`
    background-color: #8200ff;
    color: #fff;
    width: 226.5px;
    height: 48px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    cursor: pointer;
  `,
  GoIcon: styled.img`
    width: 50%;
    height: auto;
    object-fit: cover;
    margin: 10px;
  `,

  Equip: styled.button<{ is_equipped: boolean }>`
    width: 80px;
    height: 30px;
    margin-top: 5px;
    background-color: ${(props) => (props.is_equipped ? '#F3E7FF' : 'white')};
    color: black;
    border-radius: 6px;
    @media (max-width: 768px) {
      width: 48px; 
      font-size: 14px;

    }
    border: ${(props) =>
      props.is_equipped ? '1px solid #c88fff' : '1px solid #d9d9d9'};
    float: right;
    cursor: pointer;
    &:hover {
    ${(props) =>
      !props.is_equipped &&
      `
      background-color: ${props.is_equipped ? '#F3E7FF' : 'white'};
      color: black;
    `}

    &:disabled:hover {
      cursor: not-allowed;
    }
   
  `,
  Pagination: styled.div`
    position: absolute;
    justify-content: center;
    display: block;
    top: 240px;
    right: 470px;
    @media (max-width: 768px) {
      top: 360px;
      right: 160px;
    }
  `,
};
