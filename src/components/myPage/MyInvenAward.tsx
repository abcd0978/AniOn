import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';
import { fetchMyAwards } from '../../api/items';

const MyInvenAward = () => {
  const user = useAtomValue(userStore.user);
  const {
    isLoading,
    isError,
    data: awards,
  } = useQuery(
    ['myAwards', user?.id],
    async () => {
      if (!user?.id) return [];
      const result = await fetchMyAwards(user.id);
      return result;
    },
    {
      enabled: !!user?.id,
    },
  );

  if (isLoading) {
    return <div>칭호를 불러오는 중</div>;
  }

  if (isError) {
    return <div>칭호를 불러오지 못했어요</div>;
  }

  console.log('user', user);
  console.log('awards', awards);

  const awardsList = Array.isArray(awards) ? (
    <ul>
      {awards.map((awards, index) => (
        <li key={index}>{awards.items.name}</li>
      ))}
    </ul>
  ) : null;

  return (
    <div>
      <h2>내 칭호</h2>
      {awardsList}
    </div>
  );
};

export default MyInvenAward;
