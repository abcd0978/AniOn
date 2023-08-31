import React, { useEffect, useState } from 'react';
import { user as userAtom } from '../../store/userStore';
import { fetchMyPoint } from '../../api/items';
import { MyProfilePoint } from './MyPage.styles';
// import { fetchMyPoint } from '../../api/items';
import supabase from '../../supabaseClient';
import * as userStore from '../../store/userStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { Deco } from './Deco.styles';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {
  const user = useAtomValue(userAtom);
  const [myPoint, setMyPoint] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchPoint = async () => {
      if (user) {
        try {
          const point = await fetchMyPoint(user.id);
          if (point !== null) {
            setMyPoint(point);
          }
        } catch (error) {
          console.error('Error fetching point:', error);
        }
      }
    };

    fetchPoint();
  }, [user]);

  return (
    <div>
      <div>{myPoint !== undefined ? myPoint : '로딩 중...'}</div>
    </div>
  );
};

export default MyProfile;
