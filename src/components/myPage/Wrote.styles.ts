import styled, { CSSProp } from 'styled-components';

export const Review = {
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
    border: 1px solid lightgray;
    border-radius: 12px;
    background-color: transparent;
    width: auto;
    height: 30px;
    text-align: center;
  `,
  ButtonAll: styled.button`
    padding: 8px;
    margin: 2px;
    border: 1px solid #c88fff;
    border-radius: 12px;
    background-color: #8200ff;
    color: white;
    width: auto;
    height: 30px;
    text-align: center;
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
  Content: styled.div`
    display: flex;
    flex-direction: row;
  `,
};

export const Post = {
  Category: styled.div`
    width: auto;
    height: 26px;
    display: flex;
    padding: 4px 8px;
    align-items: center;
    gap: 8px;
    background: #d9d9d9;
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
  border-radius: 4px;
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
