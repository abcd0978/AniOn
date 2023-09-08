import { MyAward } from './MyPage.styles';
import * as userStore from '../../store/userStore';
import { useAtomValue } from 'jotai';
import { fetchEquippedItem } from '../../api/items';
import { useQuery } from '@tanstack/react-query';
const MyProfileAward = () => {
  const user = useAtomValue(userStore.user);

  const equipedAwardQueryOption = {
    queryKey: ['equippedAward'],
    queryFn: () => fetchEquippedItem({ user_id: user!.id, category: 1 }),
    refetchOnWindowFocus: false,
    staleTime: 60 * 60,
    enabled: !!user,
  };

  const { data: award } = useQuery(equipedAwardQueryOption);
  return (
    <MyAward.MyProfileAward>
      {award ? (
        <img
          src={award.items.img_url}
          alt={award.items.name}
          style={{ width: '215px', height: '40px' }}
        />
      ) : (
        <MyAward.NoAward>칭호없음</MyAward.NoAward>
      )}
    </MyAward.MyProfileAward>
  );
};
export default MyProfileAward;
