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
    gap: 12px;
    row-gap: 12px;
  `,

  CategoryDiv: styled.div<Props>`
    /* gap: 12px; */
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    font-size: 12px;
    height: 18px;
    padding: 4px 12px;
    color: ${(props) => (props.$isSelected ? 'white' : 'black')};
    background-color: ${(props) => (props.$isSelected ? '#FFA8DC' : '#FFF3FA')};
    cursor: pointer;
    &:hover {
      background-color: #ffdef2;
      color: black;
    }
  `,
};
