import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';
import { B } from './Deco.styles';
import goShop from '../../assets/goShop.png';
import useViewport from '../../hooks/useViewPort';
import { useNavigate } from 'react-router-dom';
import { equipItem, fetchMyAwards } from '../../api/items';

const MyInvenAward = () => {
  const queryClient = useQueryClient();
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();
  const { width, height, isMobile, isLoaded } = useViewport();

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

  const handleApplyAwardButtonClick = (item_id: string) => {
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
          <button onClick={() => handleApplyAwardButtonClick(award.item_id)}>
            적용
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <B.NoneContainer mediaWidth={width}>
      <B.NoneMessage>구매한 칭호가 없습니다.</B.NoneMessage>
      <B.NoneButton
        onClick={() => {
          navigate('/shop/:category');
        }}
      >
        칭호 구매하러 가기
        <img src={goShop} />
      </B.NoneButton>
    </B.NoneContainer>
  );
  return (
    <div>
      <h2>내 칭호</h2>
      {awardsList}
    </div>
  );
};

export default MyInvenAward;
