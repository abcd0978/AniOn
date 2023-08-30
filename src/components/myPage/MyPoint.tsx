import { useEffect, useState } from 'react';
import { MyProfilePoint } from './MyPage.styles';
import { fetchMyPoint } from '../../api/items';
import supabase from '../../supabaseClient';
import * as userStore from '../../store/userStore';
import { useAtomValue, useSetAtom } from 'jotai';

const MyPoint = () => {
  const [myPoint, setMyPoint] = useState<number | null>(null);
  const user = useAtomValue(userStore.user);

  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const { data, error } = await supabase
          .from('point')
          .select('*')
          .eq('user_id', user?.id);
        const point = await fetchMyPoint(user?.id);
        setMyPoint(point);
      } catch (error) {
        console.log('에러:', error);
      }
    };
    fetchPoint();
  }, []);
  return (
    <MyProfilePoint.RenderPoint>
      {' '}
      {myPoint !== null ? `P ${myPoint}` : 'Loading...'}
    </MyProfilePoint.RenderPoint>
  );
};

export default MyPoint;
