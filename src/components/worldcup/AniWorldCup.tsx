import { useQuery } from '@tanstack/react-query';
import { fetchCharacter } from '../../api/aniCharacters';
import { useParams } from 'react-router';
import { S } from './worldCup.style';
import { useEffect, useState } from 'react';
import { Database } from '../../types/supabase';
type ReadCharacters = Database['public']['Tables']['ani_comments']['Row'];

type Props = {};

function AniWorldCup({}: Props) {
  const { gender } = useParams() as { gender: string };

  const [displays, setDisplays] = useState<any>([]); //any인지?? 생각해

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

  console.log('😊😊', aniCharacter);
  console.log('😡😡', aniCharacter![0]);

  if (isCharacterLoading) {
    return <div>캐릭터 데이터를 가져오는 중입니다..</div>;
  }

  if (isCharacterError) {
    return <div>캐릭터 데이터를 가져오지 못했습니다..😢</div>;
  }

  // setDisplays([aniCharacter![0], aniCharacter![1]]);

  // console.log('이건가!!!', aniCharacter);

  return (
    <S.WorldCupContainer>
      <S.WorldCupMainTitle>
        {gender === 'man' ? '남자' : '여자'} 애니메이션 캐릭터 이상형 월드컵 8강
      </S.WorldCupMainTitle>
    </S.WorldCupContainer>
  );
}

export default AniWorldCup;
