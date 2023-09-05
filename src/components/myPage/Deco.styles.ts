import styled from 'styled-components';
export const Deco = {
  ButtonContainer: styled.div`
    display: flex;
  `,
  Point: styled.div`
    background-color: #f3e7ff;
    border: none;
    border-radius: 10px;
    padding: 8px 20px;
  `,
};
export const B = {
  NoneContainer: styled.div<{ $mediawidth: number }>`
    ${(props) => `height:${80 * (props.$mediawidth / 1920)}px;`}
    display: grid;
    align-items: center;

    justify-content: center;
    margin-left: 100%;
    margin-top: 100%;
  `,
  GoIcon: styled.img`
    width: 50%;
    height: auto;
    object-fit: cover;
    margin: 10px;
  `,
  BorderImg: styled.img`
    width: 250px;
    height: auto;
    object-fit: cover;
    margin: 20px;
  `,
  Number: styled.div`
    width: 100%;
    height: 80%;
    background-size: cover;
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
  NoneMessage: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  `,
  Border: styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
  `,
  Equip: styled.button`
    position: RELATIVE;
    left: 150px;
    top: -30px;
    width: 80px;
    height: 30px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #c88fff;
    cursor: pointer;
    &:hover {
      background-color: #c88fff;
      color: white;
    }

    &:disabled:hover {
      background-color: white;
      color: #cccccc;
      cursor: not-allowed;
    }
  `,
  BorderContainer: styled.div`
    width: 268px;
    height: 300px;
    margin-bottom: 5px;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-right: 100px;
  `,
  ItemBox: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  `,
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  `,
  BorderName: styled.div`
    width: 100%;
    height: 20%;
    background-color: white;
    margin-top: 5px;
    line-height: 25px;
  `,
};
export const A = {
  Name: styled.div`
    background-color: #efefef;
    padding: 8px;
    border-radius: 999px;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.3px;
    display: flex;
    height: 48px;
    width: 260px;
    padding: 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    margin: 10px;
  `,
  Equip: styled.button`
    width: 80px;
    height: 30px;
    margin-top: 5px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #c88fff;
    float: right;
    cursor: pointer;
    &:hover {
      background-color: #c88fff;
      color: white;
    }

    &:disabled:hover {
      background-color: white;
      color: #cccccc;
      cursor: not-allowed;
    }
  `,
};
