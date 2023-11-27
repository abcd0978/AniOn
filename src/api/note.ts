import supabase from '../supabaseClient';
import { findUserIdByNickname } from './auth';
import { fetchNoteType, noteType } from '../types/note';

export const fetchNotes = async (params: fetchNoteType) => {
  try {
    const startIndex = (params.page - 1) * params.itemsPerPage;
    let query;

    if (params.type === 'sent') {
      query = supabase
        .from('note')
        .select('*,users!note_recv_id_fkey(nickname))', {
          count: 'exact',
        })
        .eq('send_id', params.user_id)
        .order('sent_at', { ascending: false })
        .range(startIndex, startIndex + params.itemsPerPage - 1);
    } else {
      query = supabase
        .from('note')
        .select('*,users!note_send_id_fkey(nickname)', {
          count: 'exact',
        })
        .eq('recv_id', params.user_id)
        .order('sent_at', { ascending: false })
        .range(startIndex, startIndex + params.itemsPerPage - 1);
    }
    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    const totalPages = Math.ceil(count! / params.itemsPerPage);

    console.log(data);
    return { data, totalPages, count };
  } catch (error) {
    throw error;
  }
};

export const createNote = async (params: Omit<noteType, 'recv_id'>) => {
  try {
    const recv_id = await findUserIdByNickname(params.nickname!);
    // console.log(recv_id);
    if (recv_id === 'none' || !recv_id) {
      return 'none';
    }
    const newNote: noteType = {
      send_id: params.send_id,
      recv_id,
      title: params.title,
      content: params.content,
    };
    const { error } = await supabase.from('note').insert(newNote);
    if (error) {
      alert('에러 발생. 에러 코드를 오류 신고 게시판에 남겨주세요.\n' + error);
    }
  } catch (error) {
    throw error;
  }
};

// const deleteNote = async (params: any) => {
//   try {
//   } catch (error) {}
// };
