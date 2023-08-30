import { useEffect, useState } from 'react';
import { MyProfilePoint } from './MyPage.styles';
import { fetchMyPoint } from '../../api/items';
import supabase from '../../supabaseClient';
import * as userStore from '../../store/userStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { Deco } from './Deco.styles';

const MyPoint = () => {
  // const [myPoint, setMyPoint] = useState<number | null>(null);
  // const user = useAtomValue(userStore.user);
  // useEffect(() => {
  //   const fetchPoint = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from('point')
  //         .select('*')
  //         .eq('user_id', user?.id);
  //       const point = await fetchMyPoint(user?.id);
  //       setMyPoint(point);
  //     } catch (error) {
  //       console.log('에러:', error);
  //     }
  //   };
  //   fetchPoint();
  // }, []);
  return (
    <Deco.Point>보유 포인트</Deco.Point>
    //   <MyProfilePoint.RenderPoint>
    //     {' '}
    //     {myPoint !== null ? `P ${myPoint}` : 'Loading...'}
    //   </MyProfilePoint.RenderPoint>
  );
};

export default MyPoint;
