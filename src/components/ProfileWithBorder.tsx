import React from 'react';
import styled from 'styled-components';
import { useAtomValue } from 'jotai';
import * as userStore from '../store/userStore';
import { fetchEquippedItem } from '../api/items';
import { useQuery } from '@tanstack/react-query';

type Props = {
  mediaWidth: number;
  width: number | null;
  profile_img_url?: string | null;
  border_img_url?: string | null;
};

function ProfileWithBorder(props: Props) {
  const user = useAtomValue(userStore.user);
  // 두가지의 return.
  // 1. 헤더, 프로필
  // 2.comment, bordList, boardDetail
  const equipedBorderQueryOptions = {
    queryKey: ['equippedBorder'],
    queryFn: () =>
      fetchEquippedItem({
        user_id: user!.id,
        category: 0,
      }),
    refetchOnWinowFocus: false,
    staleTime: 60 * 60,
    eabled: !!user,
  };

  const { data: border } = useQuery(equipedBorderQueryOptions);

  if (props.profile_img_url) {
    return (
      <StProfileContainer width={props.width} mediaWidth={props.mediaWidth}>
        <StPreview
          background={props.border_img_url ? props.border_img_url : null}
        />
        <StHeaderUserProfile src={props.profile_img_url} alt="프사" />
      </StProfileContainer>
    );
  }

  return (
    <StProfileContainer width={props.width} mediaWidth={props.mediaWidth}>
      <StPreview background={border ? border.items.img_url! : null} />
      <StHeaderUserProfile src={user?.profile_img_url!} alt="프사" />
    </StProfileContainer>
  );
}
const StProfileContainer = styled.div<{
  mediaWidth: number;
  width: number | null;
}>`
  ${(props) => {
    if (props.width) {
      return `width:${props.width * (props.mediaWidth / 1920)}px;
    height:${props.width * (props.mediaWidth / 1920)}px;`;
    } else {
      return `width:${80 * (props.mediaWidth / 1920)}px;
    height:${80 * (props.mediaWidth / 1920)}px;`;
    }
  }}
  position: relative;
`;
const StPreview = styled.div<{ background: string | null }>`
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
