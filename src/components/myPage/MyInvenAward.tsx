import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';
import { equipItem, fetchMyAwards } from '../../api/items';

const MyInvenAward = () => {
  const queryClient = useQueryClient();
  const user = useAtomValue(userStore.user);

  const myAwardsQueryOptions = {
    queryKey: ['myAwards'],
    queryFn: () => fetchMyAwards(user!.id),
    refetchOnWindowFocus: false,
    staleTime: 60 * 60,
    enabled: !!user,
  };

  const { isLoading, isError, data: awards } = useQuery(myAwardsQueryOptions);

  const applyAwardMutation = useMutation(equipItem, {
    onSuccess: (data) => {
      console.log('장착 myInvenAward', data);
      queryClient.invalidateQueries(['equippedAward']);
    },
    onError: (error) => {
      console.log('장착 myInvenAward', error);
    },
  });

  // console.log('user', user);
  // console.log('awards', awards);

  const handleApplyButtonClick = (item_id: string) => {
    if (!user) {
      return;
    }

    applyAwardMutation.mutate({ user_id: user.id, item_id, category: 1 });
  };

  const awardsList = Array.isArray(awards) ? (
    <ul>
      {awards.map((award, index) => (
        <li key={index}>
          {award.items?.name}
          <button onClick={() => handleApplyButtonClick(award.item_id)}>
            적용
          </button>
        </li>
      ))}
    </ul>
  ) : null;

  if (isLoading) {
    return <div>칭호를 불러오는 중</div>;
  }

  if (isError) {
    return <div>칭호를 불러오지 못했어요</div>;
  }

  return (
    <div>
      <h2>내 칭호</h2>
      {awardsList}
    </div>
  );
};

export default MyInvenAward;
