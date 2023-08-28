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
const countNumOfWin = async (id: string): Promise<void> => {
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
};

// 이상형 월드컵 결과  가져오기
const winnerResult = async () => {
  const { data } = await supabase.from('worldcup').select('*,characters(*)');
  return data;
};

export { fetchCharacter, fetchWinnerResult, countNumOfWin, winnerResult };

// character_id
