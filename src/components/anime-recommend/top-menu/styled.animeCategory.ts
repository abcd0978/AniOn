import styled from 'styled-components';

interface Props {
  $isSelected: boolean;
}

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

  CategoryDiv: styled.div<Props>`
    color: ${(props) => (props.$isSelected ? 'white' : 'black')};
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    font-size: 12px;
    height: 18px;
    padding: 4px 12px;
    color: ${(props) => (props.$isSelected ? 'white' : 'black')};
    background-color: ${(props) => (props.$isSelected ? '#838383' : '#EFEFEF')};
    cursor: pointer;
    :hover {
      background-color: #c2c2c2;
    }
  `,
};
