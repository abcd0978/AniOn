import { useQuery } from '@tanstack/react-query';
import { fetchCharacter } from '../../api/aniCharacters';
import { useParams } from 'react-router';

type Props = {};

function AniWorldCup({}: Props) {
  const { gender } = useParams() as unknown as { gender: number };

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

  console.log('이건가!!!', aniCharacter);

  return <div>AniWorldCup</div>;
}

export default AniWorldCup;
