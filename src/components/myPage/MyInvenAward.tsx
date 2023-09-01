import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';
import { fetchMyAwards } from '../../api/items';
import { B } from './Deco.styles';
import goShop from '../../assets/goShop.png';
import useViewport from '../../hooks/useViewPort';
import { useNavigate } from 'react-router-dom';
const MyInvenAward = () => {
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

  if (isLoading) {
    return <div>칭호를 불러오는 중</div>;
  }

  if (isError) {
    return <div>칭호를 불러오지 못했어요</div>;
  }

  console.log('user', user);
  console.log('awards', awards);
  const applyAward = (awardName: string) => {
    console.log(`Applying award:${awardName}`);
  };
  const awardsList = Array.isArray(awards) ? (
    <ul>
      {awards.map((award, index) => (
        <li key={index}>
          {award.items?.name}
          <button onClick={() => applyAward(award.items?.name)}>적용</button>
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

  return <div>{awardsList}</div>;
};

export default MyInvenAward;
