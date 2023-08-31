import { useQuery } from '@tanstack/react-query';
import { fetchMyPoint } from '../../api/items';
import { useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';

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
  console.log('user', user, 'point', point);

  return (
    <div>
      <div>
        <div>{point}</div>
      </div>
    </div>
  );
};

export default MyPoint;
