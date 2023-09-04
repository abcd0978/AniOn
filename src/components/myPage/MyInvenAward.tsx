import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';
import { A } from './Deco.styles';
import { B } from './Deco.styles';
import goShop from '../../assets/goShop.png';
import useViewport from '../../hooks/useViewPort';
import { useNavigate } from 'react-router-dom';
import { equipItem, fetchMyAwards } from '../../api/items';
import { styled } from 'styled-components';
import { AwardName, BuyButton } from '../ShopAwards';

const MyInvenAward = () => {
  const queryClient = useQueryClient();
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();
  const { width, height, isMobile, isLoaded } = useViewport();

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

  const handleApplyButtonClick = (item_id: string) => {
    if (!user) {
      return;
    }

    applyAwardMutation.mutate({ user_id: user.id, item_id, category: 1 });
  };

  const awardsList = Array.isArray(awards) ? (
    <GridContainer>
      {awards.map((award, index) => (
        <div key={index}>
          <A.Name>{award.items?.name}</A.Name>
          <B.Equip onClick={() => handleApplyButtonClick(award.item_id)}>
            적용
          </B.Equip>
        </div>
      ))}
    </GridContainer>
  ) : (
    <B.NoneContainer mediaWidth={width}>
      <B.NoneMessage>구매한 칭호가 없습니다.</B.NoneMessage>
      <B.NoneButton
        onClick={() => {
          navigate('/shop/:category');
        }}
      >
        칭호 구매하러 가기
        <img src={goShop} alt="고샾" />
      </B.NoneButton>
    </B.NoneContainer>
  );
  return <GridContainer>{awardsList}</GridContainer>;
};

export default MyInvenAward;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  grid-template-columns: auto auto auto auto;
  gap: 10px;
  padding: 10px;
`;
