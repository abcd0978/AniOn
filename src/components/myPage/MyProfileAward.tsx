import { MyAward } from './Styled.MyPage/MyPage.styles';
import { useQueryClient } from '@tanstack/react-query';
import { AwardsRow } from '../../types/items';
const MyProfileAward = () => {
  const queryClient = useQueryClient();

  const award = queryClient.getQueryData(['equippedAward']) as AwardsRow;

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
