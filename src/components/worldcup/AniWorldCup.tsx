import { useQuery } from '@tanstack/react-query';
import { fetchCharacter } from '../../api/aniCharacters';
import { useParams } from 'react-router';
import { S } from './worldCup.style';
import { useEffect, useState } from 'react';
// import vs from '../../assets/vs.svg';
import { Database } from '../../types/supabase';
import { useNavigate } from 'react-router-dom';
type ReadCharacters = Database['public']['Tables']['characters']['Row'];

type Props = {};

function AniWorldCup({}: Props) {
  const { gender } = useParams() as { gender: string };

  const navigate = useNavigate();

  const [characters, setCharacters] = useState<any>([]);
  const [displays, setDisplays] = useState<any>([]); //any 말고 다시 생각해보기
  const [winners, setWinners] = useState<any>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const {
    isLoading: isCharacterLoading,
    isError: isCharacterError,
    data: aniCharacter,
  } = useQuery({
    queryKey: ['aniCharacter', gender],
    queryFn: () => {
      return fetchCharacter(gender);
    },
  });

  useEffect(() => {
    if (!isDataLoaded && aniCharacter) {
      setCharacters(aniCharacter);
      setDisplays([aniCharacter[0], aniCharacter[1]]);
      setIsDataLoaded(true);
    }
  }, [aniCharacter, isDataLoaded]);

  // console.log('😊😊', displays);

  if (isCharacterLoading) {
    return <div>캐릭터 데이터를 가져오는 중입니다..</div>;
  }

  if (isCharacterError) {
    return <div>캐릭터 데이터를 가져오지 못했습니다..😢</div>;
  }
  // console.log('이건가!!!', aniCharacter);

  // 이상형 월드컵 캐릭터 선택
  const SelectWinnerhandler = (character: ReadCharacters) => () => {
    if (characters.length <= 2) {
      if (winners.length === 0) {
        setDisplays([character]);
        console.log('r u winner???', character);
        navigate(`/worldcup/result/${gender}`, { state: character });
      } else {
        let updatedCharacter = [...winners, character];
        setCharacters(updatedCharacter);
        setDisplays([updatedCharacter[0], updatedCharacter[1]]);
        setWinners([]);
      }
    } else if (characters.length > 2) {
      setWinners([...winners, character]);
      setDisplays([characters[2], characters[3]]);
      setCharacters(characters.slice(2));
    }
  };

  return (
    <>
      <S.WorldCupContainer>
        <S.WorldCupMainTitle>
          {gender === 'man' ? '남자' : '여자'} 애니메이션 캐릭터 이상형 월드컵
          8강
          <S.WorldCupTestContainer>
            {displays.map((character: ReadCharacters) => {
              return (
                <S.WorldCupTest key={character.id}>
                  <S.WorldCupUp>
                    <S.WorldCupImg>
                      <img src={character.img_url} />
                    </S.WorldCupImg>
                    <div>
                      <S.WorldCupTitle>{character.ani_title}</S.WorldCupTitle>
                      <S.WorldCupName>
                        {character.character_name}
                      </S.WorldCupName>
                    </div>
                  </S.WorldCupUp>
                  <S.WorldCupTestButton
                    onClick={SelectWinnerhandler(character)}
                  >
                    선택하기
                  </S.WorldCupTestButton>
                </S.WorldCupTest>
              );
            })}
          </S.WorldCupTestContainer>
        </S.WorldCupMainTitle>
      </S.WorldCupContainer>
    </>
  );
}

export default AniWorldCup;