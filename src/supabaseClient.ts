import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseServKey: string = process.env.REACT_APP_SERV_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServKey);

export default supabase;
