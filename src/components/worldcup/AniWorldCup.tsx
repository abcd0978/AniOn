import { useQuery } from '@tanstack/react-query';
import { fetchCharacter } from '../../api/aniCharacters';
import { useParams } from 'react-router';

type Props = {};

function AniWorldCup({}: Props) {
  const { gender } = useParams() as { gender: string };

  const {
    isLoading: isCharacterLoading,
    isError: isCharacterError,
    data: aniCharacter,
  } = useQuery({
    queryKey: ['aniCharacter'],
    queryFn: () => {
      return fetchCharacter(gender);
    },
  });

  if (isCharacterLoading) {
    return <div>캐릭터 데이터를 가져오는 중입니다..</div>;
  }

  if (isCharacterError) {
    return <div>캐릭터 데이터를 가져오지 못했습니다..😢</div>;
  }

  console.log('이건가!!!', aniCharacter);

  return <div>뭐여</div>;
}

export default AniWorldCup;
