import { createClient } from '@supabase/supabase-js';

console.log(process.env.REACT_APP_SERV_ROLE_KEY)
const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey: string = process.env.REACT_APP_ANON_KEY || '';
const supabaseServKey: string = process.env.REACT_APP_SERV_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServKey);

export default supabase;
