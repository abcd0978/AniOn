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

  const borderList = Array.isArray(borders) ? (
    <ul>
      {borders.map((borders, index) => (
        <li key={index}>{borders.items?.name}</li>
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
