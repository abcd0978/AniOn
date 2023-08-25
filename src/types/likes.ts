import { Database } from './supabase';

export type ReadAnimeLikeG = Database['public']['Tables']['anime_likes']['Row'];
export type InsertAnimeLikeG =
  Database['public']['Tables']['anime_likes']['Insert'];

// export const toggleJjim = async (data: JjimType) => {
//     try {
//       const { data: isJjim, error: isJjimError } = await supabase
//         .from('jjim')
//         .select('*')
//         .eq('pid', data.pid)
//         .eq('uid', data.uid);

//       if (isJjimError) {
//         console.log('Error fetching jjim:', isJjimError);
//         alert('에러가 발생했습니다.' + isJjimError);
//         return false;
//       }

//       if (isJjim.length > 0) {
//         const { error: deleteError } = await supabase.from('jjim').delete().eq('pid', data.pid).eq('uid', data.uid);

//         if (deleteError) {
//           console.log('Error deleting jjim:', deleteError);
//           alert('에러가 발생했습니다.' + deleteError);
//           return false;
//         }
//         alert('찜을 취소하셨습니다.');
//         return true;
//       } else {
//         const { error: insertError } = await supabase.from('jjim').insert([{ pid: data.pid, uid: data.uid }]);

//         if (insertError) {
//           console.log('Error inserting jjim:', insertError);
//           alert('에러가 발생했습니다.' + insertError);
//           return false;
//         }
//         alert('찜 하셨습니다.');
//         return true;
//       }
//     } catch (e) {
//       console.log(e);
//       alert('알 수 없는 오류가 발생했습니다.');
//       return false;
//     }
//   };
