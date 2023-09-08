import styled from 'styled-components';
export const D = {
  Page: styled.div`
    position: absolute;
    top: 170px;
  `,
  Title: styled.div`
    position: absolute;
    top: -25px;
    left: 150px;
    width: 200px;
    height: 32px;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
  `,
  Container: styled.div`
    display: grid;
    position: absolute;
    flex-direction: column;
    margin-top: -18%;
    margin-left: 150px;
  `,
  ButtonContainer: styled.div`
    display: flex;
  `,
};
export const B = {
  Container: styled.div`
    position: absolute;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px 1px;
  `,
  BorderContainer: styled.div`
    position: absolute;
  `,
  BorderImg: styled.img`
    width: 150px;
    height: auto;
    object-fit: cover;
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
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
  `,
  BorderPage: styled.div`
    position: absolute;
    justify-content: center;
    top: -45px;
    left: 810px;
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
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    padding: 10px;
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
  Page: styled.div`
    position: absolute;
    justify-content: center;
    top: -565px;
    left: 630px;
  `,

  Equip: styled.button<{ is_equipped: boolean }>`
    width: 80px;
    height: 30px;
    margin-top: 5px;
    background-color: ${(props) => (props.is_equipped ? '#F3E7FF' : 'white')};
    color: black;
    border-radius: 6px;
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
};
