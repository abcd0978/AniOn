import styled from 'styled-components';

export const S = {
  // 전체 container
  SearchContainer: styled.div`
    width: 15%;
    height: 36px;
    border: 1px solid black;
    gap: 16px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    justify-content: space-between;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-left: 1rem;
  `,

  SearchInput: styled.input`
    width: 60%;
    height: 50%;
    border: none;
    border-left: 1px solid grey;
    padding: 0px 5px 0px 5px;
    outline: none; /* 원하는 스타일로 변경 가능 */
    font-size: 0.875rem;
  `,
  // 버튼들 container
  //   ButtonContainer: styled.div`
  //     display: flex;
  //     gap: 20px;
  //   `,

  // 버튼(카테고리)
  // 색상 : E2E2E2(기본), 757575(선택 중)
  //   CategoryButton: styled.button<Props>`
  //     color: ${(props) => (props.isSelected ? 'white' : 'black')};
  //     background-color: ${(props) => (props.isSelected ? '#757575' : '#e2e2e2')};
  //   `,
};
