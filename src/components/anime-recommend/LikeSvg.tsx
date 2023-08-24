import React from 'react';
import styled from 'styled-components';

const StyledSVG = styled.svg`
  width: 24px;
  height: 24px;
`;

const Mask = styled.mask`
  mask-type: alpha;
`;

const Path = styled.path`
  fill: ${(props) => props.fill || 'white'};
`;

interface Props {
  is_like?: boolean;
  onClick?: () => void;
}
function LikeSvg({ is_like, onClick }: Props) {
  const handleOnClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(); // 클릭 이벤트 처리 함수 호출
    }
  };

  return (
    <StyledSVG
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleOnClick}
    >
      <Mask
        id="mask0_15_53107"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <g mask="url(#mask0_15_53107)">
        <Path
          d="M12 20.9999L10.55 19.6999C8.86667 18.1832 7.475 16.8749 6.375 15.7749C5.275 14.6749 4.4 13.6874 3.75 12.8124C3.1 11.9374 2.64583 11.1332 2.3875 10.3999C2.12917 9.66657 2 8.91657 2 8.1499C2 6.58324 2.525 5.2749 3.575 4.2249C4.625 3.1749 5.93333 2.6499 7.5 2.6499C8.36667 2.6499 9.19167 2.83324 9.975 3.1999C10.7583 3.56657 11.4333 4.08324 12 4.7499C12.5667 4.08324 13.2417 3.56657 14.025 3.1999C14.8083 2.83324 15.6333 2.6499 16.5 2.6499C18.0667 2.6499 19.375 3.1749 20.425 4.2249C21.475 5.2749 22 6.58324 22 8.1499C22 8.91657 21.8708 9.66657 21.6125 10.3999C21.3542 11.1332 20.9 11.9374 20.25 12.8124C19.6 13.6874 18.725 14.6749 17.625 15.7749C16.525 16.8749 15.1333 18.1832 13.45 19.6999L12 20.9999Z"
          fill={is_like ? '#FF4343' : 'white'}
        />
      </g>
    </StyledSVG>
  );
}

export default LikeSvg;
