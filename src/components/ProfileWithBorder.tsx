import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAtomValue } from 'jotai';
import * as userStore from '../store/userStore';
import { fetchEquippedItem } from '../api/items';
import { useQuery } from '@tanstack/react-query';

type Props = {
  onClick?: any;
  $mediawidth: number;
  width: number | null;
  minWidth?: number;
  profile_img_url?: string | null;
  border_img_url?: string | null;
};

export const processItem = (
  params: {
    id: string;
    items: { name: string; img_url: string; category: number };
  }[],
): {
  border: string | null;
  award: { name: null | string; img_url: null | string };
} => {
  if (!params) {
    return {
      border: null,
      award: {
        name: null,
        img_url: null,
      },
    };
  }
  let result: {
    border: null | string;
    award: { name: null | string; img_url: null | string };
  } = {
    border: null,
    award: {
      name: null,
      img_url: null,
    },
  };

  for (let i = 0; i < params.length; i++) {
    if (params[i]?.items.category === 0) {
      result.border = params[i].items.img_url;
    } else {
      result.award.name = params[i].items.name;
      result.award.img_url = params[i].items.img_url;
    }
  }
  return result;
};

function ProfileWithBorder(props: Props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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
      <StProfileContainer
        onClick={props.onClick}
        minWidth={props.minWidth}
        width={props.width}
        $mediawidth={props.$mediawidth}
      >
        <StPreview
          background={props.border_img_url ? props.border_img_url : null}
        />
        <StHeaderUserProfile src={props.profile_img_url} alt="프사" />
      </StProfileContainer>
    );
  }

  return (
    <StProfileContainer
      onClick={props.onClick}
      minWidth={props.minWidth}
      width={props.width}
      $mediawidth={props.$mediawidth}
    >
      <StPreview background={border ? border.items.img_url! : null} />
      <StHeaderUserProfile src={user?.profile_img_url!} alt="프사" />
    </StProfileContainer>
  );
}
const StProfileContainer = styled.div<{
  $mediawidth: number;
  width: number | null;
  minWidth?: number | undefined;
}>`
  ${(props) => {
    if (props.width) {
      return `width:${props.width * (props.$mediawidth / 1920)}px;
    height:${props.width * (props.$mediawidth / 1920)}px;`;
    } else {
      return `width:${60 * (props.$mediawidth / 1920)}px;
    height:${60 * (props.$mediawidth / 1920)}px;`;
    }
  }}
  ${(props) => {
    if (props.minWidth) {
      return `min-width:${props.minWidth}px;
    min-height:${props.minWidth}px;`;
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
