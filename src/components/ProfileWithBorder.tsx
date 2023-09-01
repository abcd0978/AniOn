import React from 'react';
import styled from 'styled-components';
type Props = {
  width: number;
  borderUrl: string;
  profileUrl: string;
};

function ProfileWithBorder(props: Props) {
  return (
    <StProfileContainer mediaWidth={props.width}>
      <StPreview background={props.borderUrl} />
      <StHeaderUserProfile src={props.profileUrl} alt="프사" />
    </StProfileContainer>
  );
}
const StProfileContainer = styled.div<{ mediaWidth: number }>`
  ${(props) =>
    `width:${80 * (props.mediaWidth / 1920)}px;
    height:${80 * (props.mediaWidth / 1920)}px;`}
  position: relative;
`;
const StPreview = styled.div<{ background: string }>`
  z-index: 3;
  position: absolute;
  background-image: url(${(props) => props.background});
  background-size: cover;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;
const StHeaderUserProfile = styled.img`
  width: calc(100% / 1.28787);
  height: calc(100% / 1.28787);
  object-fit: cover;
  border-radius: 50%;
  position: absolute;
  background: #d9d9d9;
  top: 12.5%;
  left: 12.5%;
  z-index: 2;
`;
export default ProfileWithBorder;
