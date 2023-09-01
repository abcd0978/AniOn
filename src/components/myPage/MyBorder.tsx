import { fetchMyBorders } from '../../api/items';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import * as userStore from '../../store/userStore';

const MyBorder = () => {
  const user = useAtomValue(userStore.user);
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
  console.log('user', user);
  console.log('borders', borders);
  const applyAward = (awardName: string) => {
    console.log(`Applying award:${awardName}`);
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
            <button onClick={() => applyAward(filteredBorders.items?.name)}>
              적용
            </button>
          </li>
        ))}
      </ul>
    ) : null;
  return (
    <div>
      <h2>내 테두리</h2>
      {borderList}
    </div>
  );
};

export default MyBorder;
