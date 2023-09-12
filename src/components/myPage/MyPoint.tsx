import { useQuery } from '@tanstack/react-query';
import { fetchMyPoint } from '../../api/items';
import { useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';
import { styled } from 'styled-components';

const MyPoint = () => {
  const user = useAtomValue(userStore.user);

  const {
    isLoading,
    isError,
    data: point,
  } = useQuery(
    ['myPoint', user?.id],
    async () => {
      if (!user?.id) return null;
      const result = await fetchMyPoint(user.id);
      if (result === undefined) return null;
      return result;
    },
    {
      enabled: !!user?.id,
    },
  );

  if (isLoading) {
    return <div>로딩중! </div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  // console.log('user', user, 'point', point);

  return (
    <div>
      <div>
        <Point>보유 P {point}</Point>
      </div>
    </div>
  );
};

export default MyPoint;

const Point = styled.div`
  width: 132px;
  height: 34px;
  background-color: #f3e7ff;
  text-align: center;
  color: #4f4f4f;
  border-radius: 10px;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 14px;
    width: 120px;
    height: 30px;
    font-weight: 500;
  }
`;
