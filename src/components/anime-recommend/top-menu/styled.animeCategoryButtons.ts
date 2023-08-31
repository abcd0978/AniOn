import styled from 'styled-components';

// button 선택에 따른 색상 변경
interface Props {
  $isSelected?: boolean;
}

export const S = {
  CategoryContainer: styled.div`
    display: flex;
    gap: 10px;
  `,

  // 버튼(카테고리)
  // 색상 : E2E2E2(기본), 757575(선택 중)
  CategoryButton: styled.button<Props>`
    width: 100px;
    height: 36px;
    padding: 8px;
    border: none;
    border-radius: 999px;
    position: relative;
    font-weight: bold;
    color: ${(props) => (props.$isSelected ? 'white' : 'black')};
    background-color: ${(props) => (props.$isSelected ? '#FF96DB' : '#FFEBF7')};
    cursor: pointer;
    ${(props) =>
      props.$isSelected &&
      `
    &::after {
      content: '';
	    position: absolute;
  	  bottom: 0;
  	  left: 50%;
    	width: 0;
	    height: 0;
	    border: 7px solid transparent;
	    border-top-color: #FF96DB;
	    border-bottom: 0;
	    margin-left: -7px;
	    margin-bottom: -7px;
    }
  `}
  `,
};
