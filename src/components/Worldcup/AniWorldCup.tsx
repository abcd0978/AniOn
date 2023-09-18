import { useQuery } from '@tanstack/react-query';
import { fetchCharacter, updateNumOfWin } from '../../api/aniCharacters';
import { useParams } from 'react-router';
import { S } from './worldCup.styles';
import { useEffect, useState } from 'react';
import { Database } from '../../types/supabase';
import { useNavigate } from 'react-router-dom';
import { updatePoint } from '../../api/items';
import * as userStore from '../../store/userStore';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
type ReadCharacters = Database['public']['Tables']['characters']['Row'];

function AniWorldCup() {
  const { gender } = useParams() as { gender: string };
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();

  const [characters, setCharacters] = useState<ReadCharacters[]>([]);
  const [displays, setDisplays] = useState<ReadCharacters[]>([]);
  const [winners, setWinners] = useState<ReadCharacters[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [currentRound, setCurrentRound] = useState('32강');

  // 함수를 이용해 현재 라운드 정보를 계산
  const calculateCurrentRound = (charactersLeft: number) => {
    if (charactersLeft > 16 && charactersLeft <= 32) {
      return '32강';
    } else if (charactersLeft > 8 && charactersLeft <= 16) {
      return '16강';
    } else if (charactersLeft > 4) {
      return '8강';
    } else if (charactersLeft > 2) {
      return '4강';
    } else if (charactersLeft === 2) {
      return '결승';
    } else {
      return ''; // 예외 처리.
    }
  };

  // 현재 라운드 진행도 계산 함수
  const totalMatchesPerRound = () => {
    if (currentRound === '32강') {
      return 16;
    } else if (currentRound === '16강') {
      return 8;
    } else if (currentRound === '8강') {
      return 4;
    } else if (currentRound === '4강') {
      return 2;
    } else {
      return 1;
    }
  };

  // 현재 라운드 진행도 계산 함수
  const calculateProgress = () => {
    const currentRoundTotalMatches = totalMatchesPerRound(); // 현재 라운드의 총 매치 수
    const completedMatches = winners.length + 1; // 현재까지 완료된 매치 수

    return `${completedMatches}/${currentRoundTotalMatches}`;
  };

  // 현재 라운드 정보 계산
  useEffect(() => {
    const charactersLeft = characters.length + winners.length;
    const currentRound = calculateCurrentRound(charactersLeft);
    setCurrentRound(currentRound);
  }, [characters, winners]);

  const aniCharacterQueryOption = {
    queryKey: ['aniCharacter', gender],
    queryFn: () => fetchCharacter(gender),
    refetchOnWindowFocus: false,
  };
  const {
    isLoading: isCharacterLoading,
    isError: isCharacterError,
    data: aniCharacter,
  } = useQuery(aniCharacterQueryOption);

  useEffect(() => {
    if (!isDataLoaded && aniCharacter) {
      setCharacters(aniCharacter);
      setDisplays([aniCharacter[0], aniCharacter[1]]);
      setIsDataLoaded(true);
    }
  }, [aniCharacter, isDataLoaded]);

  if (isCharacterLoading) {
    return <Loading />;
  }

  if (isCharacterError) {
    return <div>캐릭터 데이터를 가져오지 못했습니다..😢</div>;
  }

  // 이상형 월드컵 캐릭터 선택
  const SelectWinnerhandler = (character: ReadCharacters) => async () => {
    if (characters.length <= 2) {
      if (winners.length === 0) {
        await updateNumOfWin(character.id);
        setDisplays([character]);

        if (!user) {
          toast.success('친구에게 테스트를 공유해보세요!', {
            autoClose: 1200,
          });
          navigate(`/worldcup/result/${gender}`, { state: character });
        } else {
          await updatePoint({ userId: user?.id!, point: 2 });
          toast.success(
            `${user?.nickname}님의 이상형을 찾았어요!ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ 💰2포인트 적립`,
            { autoClose: 1200 },
          );
          navigate(`/worldcup/result/${gender}`, { state: character });
        }
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
          {gender === 'man' ? '남자' : '여자'} 애니메이션 캐릭터 이상형 월드컵{' '}
          {currentRound} <p>{calculateProgress()}</p>
        </S.WorldCupMainTitle>
        <S.WorldCupRealTestContainer>
          {displays.map((character: ReadCharacters, index) => {
            // console.log(index);
            return (
              <S.WorldCupTest key={character.id}>
                <S.WorldCupUp>
                  <S.WorldCupImg>
                    <S.CharacterImg
                      src={character.img_url}
                      alt={character.character_name}
                    />
                  </S.WorldCupImg>
                  <S.WorldCupTitleBox>
                    <S.WorldCupTitle>{character.ani_title}</S.WorldCupTitle>
                    <S.WorldCupName>{character.character_name}</S.WorldCupName>
                  </S.WorldCupTitleBox>
                </S.WorldCupUp>
                <S.WorldCupTestPickButton
                  onClick={SelectWinnerhandler(character)}
                >
                  선택하기
                </S.WorldCupTestPickButton>
              </S.WorldCupTest>
            );
          })}
        </S.WorldCupRealTestContainer>
      </S.WorldCupContainer>
    </>
  );
}

export default AniWorldCup;
