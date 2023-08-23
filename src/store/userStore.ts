import { atom } from "jotai";
import { Database } from "../types/supabase";
type Usertype = Database["public"]["Tables"]["users"]["Row"];
export const user = atom<Usertype | null>(null);
