import styled, { CSSProp } from 'styled-components';

export const R = {
  Container: styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 16px;
    left: 25vw;
    top: 20vh;
  `,

  Title: styled.div`
    position: absolute;
    top: -50px;
    width: 200px;
    height: auto;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
  `,
  Outer: styled.div`
    list-style-type: none;
    width: 900px;
    height: 132px;
  `,

  Top: styled.div`
    display: flex;
    justify-content: space-between;
    width: 900px;
    height: auto;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    top: 30vh;
  `,
  ReviewTitle: styled.div`
    min-width: 780px;
    min-height: 40px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
  `,
  Date: styled.div`
    color: #999;
    width: 500px;
    font-size: 13px;
    font-style: normal;
    letter-spacing: -0.195px;
    margin-left: -80px;
  `,
  Comments: styled.div`
    width: 900px;
    min-height: 48px;
    line-height: 24px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    max-height: calc(1.5em * 2);
    overflow-y: auto;

    text-overflow: ellipsis;
  `,

  ButtonArray: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  GoButton: styled.button`
    border-radius: 6px;
    border: 1px solid var(--achromatic-colors-midgray-2, #dbdbdb);
    color: black;
    background-color: white;

    width: 78px;
    height: 28px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
  `,
  Button: styled.button`
    border-radius: 6px;
    border: 1px solid var(--main-mid-2, #c88fff);
    background: #fdfbff;
    width: 64px;
    height: 28px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      background-color: #c88fff;
      color: white;
    }
  `,
  ButtonIcon: styled.img`
    width: 12px;
    height: 12px;
    color: white;
  `,
  Page: styled.div`
    position: relative;
    justify-content: center;
    margin-left: 25vw;
  `,
  NoContainer: styled.div`
    display: grid;
    align-items: center;

    justify-content: center;
    margin-left: 250%;
    margin-top: -20%;
  `,
  NoMessage: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  `,
  GoWriteReview: styled.button`
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
    border-color: transparent;
  `,
};

export const P = {
  Container: styled.div`
    position: absolute;
    top: 10vh;
    left: 25vw;
  `,
  Title: styled.div`
    position: relative;
    margin-bottom: 40px;
    width: 200px;
    height: 32px;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
    display: block;
  `,
  PostsContainer: styled.div``,

  WriteP: styled.div`
    position: relative;
    top: 550px;
    left: 350px;
  `,
  NoContainer: styled.div`
    display: grid;
    align-items: center;

    justify-content: center;
    margin-left: 250%;
    margin-top: -20%;
  `,
  NoButton: styled.button`
    background-color: #8200ff;
    border-color: transparent;

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
  NoMessage: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  `,
  PickButton: styled.button`
    padding: 8px;
    display: flex;
    align-items: center;
    margin: 2px;
    border: 1px solid #c88fff;
    border-radius: 6px;
    background-color: #8200ff;
    width: 112px;
    height: 32px;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    color: var(--achromatic-colors-white, #fff);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.225px;
  `,
  PickButtonAll: styled.button`
    padding: 8px;
    display: flex;
    border-radius: 6px;
    border: 1px solid var(--main-mid-2, #c88fff);
    background: var(--main-light, #fdfbff);
    border-radius: 6px;
    align-items: center;

    color: white;
    width: auto;
    height: 32px;
    text-align: center;
    float: right;
    cursor: pointer;
    color: var(--achromatic-colors-darkgray, #4f4f4f);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.225px;
    justify-content: center;
  `,
  PickButtonBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: calc(100% - 5px);
    margin-top: 12px;
  `,

  Category: styled.div`
    width: auto;
    height: 35px;
    display: flex;
    padding: 4px 8px;
    align-items: center;
    gap: 8px;
    background: #d9d9d9;
    align-items: center;
    display: flex;
  `,
  Date: styled.div`
    font-size: 14px;
    color: #757575;
    float: right;
    max-width: 160px;
    // display: flex;
  `,
  PostTitle: styled.div`
    min-width: 780px;
    min-height: 40px;
    align-items: center;
    display: flex;
    justify-content: space-between;
  `,
  Box: styled.div`
    display: flex;
    flex-direction: row;
    cursor: pointer;
  `,
  Input: styled.input`
    min-width: 24px;
    height: 24px;
    cursor: pointer;
  `,
  Content: styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: row;
    height: 35px;
  `,
  line: styled.div`
    border-bottom: 1px solid #ccc;
    width: 900px;
    height: 56px;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
    margin-bottom: -7px;
    gap: 16px;
  `,
  Button: styled.button`
    padding: 8px;
    margin: 2px;
    border: 1px solid #c88fff;
    border-radius: 12px;
    background-color: white;
    width: auto;
    height: 30px;
    text-align: center;
    cursor: pointer;
  `,
  ButtonAll: styled.button`
    padding: 8px;
    border: 1px solid #c88fff;
    border-radius: 12px;
    background-color: #8200ff;
    color: white;
    width: auto;
    height: 30px;
    text-align: center;
    float: right;
    cursor: pointer;
  `,
  ButtonBox: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-self: stretch;
  `,
};

interface StyledPostCategoryProps {
  category: string;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  css?: CSSProp;
}

export const StyledPostCategory = styled.span<StyledPostCategoryProps>`
  display: inline-block;
  min-width: 84px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  margin-top: 4px;
  margin-left: 3px;
  margin-right: 7px;
  ${(props) => {
    if (props.category === '애니')
      return `background-color: #C88FFF; color: white; border-radius:10px;`;
    if (props.category === '오류 신고')
      return `background-color: #FF535D; color: white; border-radius:10px;`;
    if (props.category === '자유')
      return `background-color: #FF96DB; color: white; border-radius:10px;`;
    return `background-color: inherit; color: inherit;`;
  }};
`;
