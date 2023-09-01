import { equipItem, fetchMyBorders } from '../../api/items';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import * as userStore from '../../store/userStore';
import goShop from '../../assets/goShop.png';
import { B } from './Deco.styles';
const MyBorder = () => {
  const user = useAtomValue(userStore.user);
  const writeUserItem = useSetAtom(userStore.writeUserItem);
  const {
    isLoading,
    isError,
    data: borders,
  } = useQuery(
    ['myBorders', user?.id],
    async () => {
      if (!user?.id) return [];
      const result = await fetchMyBorders(user.id);
      return result;
    },
    {
      enabled: !!user?.id,
    },
  );
  if (isLoading) {
    return <div>테두리를 불러오는 중</div>;
  }
  if (isError) {
    return <div>테두리를 불러오지 못했어요.</div>;
  }
  const applyAward = (itemId: string) => {
    console.log(`Applying award:${itemId}`);
  };
  const filteredBorders = borders.filter((borders) => borders.items !== null);
  console.log(filteredBorders);
  const borderList =
    Array.isArray(filteredBorders) && filteredBorders.length > 0 ? (
      <ul>
        {filteredBorders.map((filteredBorders, index) => (
          <li key={index}>
            {filteredBorders.items?.name}
            <img
              src={filteredBorders.items?.img_url}
              alt={filteredBorders.items?.name}
            />
            <button onClick={() => applyAward(filteredBorders.items?.id)}>
              적용
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <div>
        <div>구매한 테두리가 없습니다.</div>
        <B.NoneButton>
          테두리 구매하러 가기
          <img src={goShop} />
        </B.NoneButton>
      </div>
    );
  return (
    <div>
      <h2>내 테두리</h2>
      {borderList}
    </div>
  );
};

export default MyBorder;
