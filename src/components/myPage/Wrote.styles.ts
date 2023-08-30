import styled, { CSSProp } from 'styled-components';

export const Review = {
  Divide: styled.div`
    width: 1000px;
    height: 36px;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    position: relative;
    top: -290px;
    margin-left: 150px;
  `,
  ButtonContainer: styled.div`
    position: relative;
    flex-direction: column;
    left: 800px;
    margin-top: -50px;
  `,
  ButtonArray: styled.div`
    display: flex;
  `,
  ButtonIcon: styled.img`
    width: 12px;
    height: 12px;
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
  `,
  ButtonAll: styled.button`
    padding: 8px;
    margin-right: 40px;
    border: 1px solid #c88fff;
    border-radius: 12px;
    background-color: #8200ff;
    color: white;
    width: auto;
    height: 30px;
    text-align: center;
    float: right;
  `,
  ButtonBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  `,
  ReviewComments: styled.div`
    width: 600px;
    height: 100px;
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
    width: 200px;
    display: flex;
  `,
  title: styled.div`
    width: 830px;
    height: 35px;
    align-items: center;
    display: flex;
    justify-content: space-between;
  `,
  Box: styled.div`
    display: flex;
    flex-direction: row;
  `,
  input: styled.input`
    width: 24px;
    height: 24px;
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
    height: 35px;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
    margin-bottom: -7px;
  `,
};

interface StyledPostCategoryProps {
  category: string;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  css?: CSSProp;
}

export const StyledPostCategory = styled.span<StyledPostCategoryProps>`
  display: inline-block;
  width: 84px;
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
