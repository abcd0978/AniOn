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

export { fetchCharacter };
