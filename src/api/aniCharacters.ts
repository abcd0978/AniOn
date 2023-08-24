import supabase from '../supabaseClient';
import { Database } from '../types/supabase';

const fetchCharacter = async (gender: number) => {
  const { data } = await supabase
    .from('characters')
    .select('*')
    .eq('gender', gender);
  return data;
};

export { fetchCharacter };
