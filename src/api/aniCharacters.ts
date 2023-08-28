import supabase from '../supabaseClient';
// import { Database } from '../types/supabase';

const fetchCharacter = async (gender: string) => {
  const { data } = await supabase
    .from('characters')
    .select('*')
    .eq('gender', gender);
  data?.sort(() => Math.random() - 0.5);
  return data;
};

// 이상형 월드컵 결과(최종 우승 캐릭 하나만, 결과 카운트 세려고)
const fetchWinnerResult = async (id: string): Promise<any> => {
  const { data } = await supabase
    .from('worldcup')
    .select('*,characters(*)')
    .eq('character_id', id);
  return data;
};

// 캐릭터 num_of_win +1 추가하기
const updateNumOfWin = async (id: string): Promise<void> => {
  const currentData = await supabase
    .from('worldcup')
    .select('num_of_win')
    .eq('character_id', id);
  if (
    currentData.data &&
    currentData.data.length > 0 &&
    currentData.data[0].num_of_win !== null
  ) {
    const currentNumOfWin = currentData.data[0].num_of_win;

    await supabase
      .from('worldcup')
      .update({ num_of_win: currentNumOfWin + 1 })
      .eq('character_id', id);
  }

  // console.log('update!!!');
};

// 이상형 월드컵 결과 가져오기
const winnerResult = async (gender: string, id: string) => {
  await updateNumOfWin(id);

  const { data } = await supabase
    .from('characters')
    .select('*,worldcup(num_of_win)')
    .eq('gender', gender);

  // num_of_win 값을 추출 후 내림차순 //배열안 객체 안 배열에 num_of_win이 있어서
  const sortedData = data?.sort((a, b) => {
    const aNumOfWin = a.worldcup[0]?.num_of_win || 0;
    const bNumOfWin = b.worldcup[0]?.num_of_win || 0;
    return bNumOfWin - aNumOfWin;
  });

  console.log('winner api!!!!');
  return sortedData;
};

export { fetchCharacter, fetchWinnerResult, updateNumOfWin, winnerResult };
