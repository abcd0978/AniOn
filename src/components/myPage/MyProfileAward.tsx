import { MyAward } from './Styled.MyPage/MyPage.styles';
import { useQuery } from '@tanstack/react-query';

import * as userStore from '../../store/userStore';
import { fetchEquippedItem } from '../../api/items';
import { useAtomValue } from 'jotai';
const MyProfileAward = () => {
  const user = useAtomValue(userStore.user);

  const equipedAwardQueryOptions = {
    queryKey: ['equippedAward'],
    queryFn: () => fetchEquippedItem({ user_id: user!.id, category: 1 }),
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    cacheTime: 60 * 6000,
    enabled: !!user,
  };
  const { data: award } = useQuery(equipedAwardQueryOptions);

  return (
    <MyAward.MyProfileAward>
      {award ? (
        <MyAward.AwardImg src={award.items.img_url} alt={award.items.name} />
      ) : (
        <MyAward.NoAward>칭호없음</MyAward.NoAward>
      )}
    </MyAward.MyProfileAward>
  );
};
export default MyProfileAward;
