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
  NoneContainer: styled.div<{ mediaWidth: number }>`
    ${(props) => `height:${80 * (props.mediaWidth / 1920)}px;`}
    display: grid;
    align-items: center;

    justify-content: center;
    margin-left: 150%;
    margin-top: 100%;
  `,
  GoIcon: styled.img`
    width: 24px;
    height: 24px;
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
};
