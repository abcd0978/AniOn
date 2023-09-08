import styled, { CSSProp } from 'styled-components';

//리뷰 관리 css
export const Review = {
  Container: styled.div`
    position: absolute;
    top: 23%;
    left: 30%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  Top: styled.div`
    display: flex;
    justify-content: space-between;
    width: 900px;
    height: 19px;
  `,
  Outer: styled.div`
    list-style-type: none;

    width: 900px;
    height: 132px;
  `,
  Title: styled.div`
    font-weight: 700;
    font-size: 16px;
  `,

  ButtonArray: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  ButtonIcon: styled.img`
    width: 12px;
    height: 12px;
    color: white;
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
  `,

  ReviewComments: styled.div`
    width: 900px;
    min-height: 48px;
    margin-top: 10px;
    line-height: 24px;
  `,
  Date: styled.div`
    color: #999;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.195px;
  `,
  li: styled.div`
    display: flex;
    flex-direction: row;
  `,
};

//작성한 글 css
export const Post = {
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
  Title: styled.div`
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
