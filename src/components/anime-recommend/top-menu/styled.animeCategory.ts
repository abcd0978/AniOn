import styled from 'styled-components';

export const S = {
  CategorySection: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 1126px;
    gap: 5px;
    row-gap: 15px;
    margin: 10px 0px;
  `,

  CategoryDiv: styled.div`
    background-color: #efefef;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    font-size: 12px;
    height: 18px;
    padding: 4px 12px;
    cursor: pointer;
  `,
};
