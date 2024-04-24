import supabase from '../supabaseClient';
import { findUserIdByNickname } from './auth';
import { fetchNoteType, noteType, readNoteType } from '../types/note';

// fetch한 쪽지 중 read_at이 비어있으면 alarmNote true로 변경하는 로직 짜기
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

    return { data, totalPages, count };
  } catch (error) {
    throw error;
  }
};

export const createNote = async (params: Omit<noteType, 'recv_id'>) => {
  try {
    const recv_id = await findUserIdByNickname(params.nickname!);

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
      alert(
        '에러 발생. 에러 코드를 오류 신고 게시판에 남겨주세요.\n' +
          JSON.stringify(error),
      );
    }
  } catch (error) {
    throw error;
  }
};

// count만 줌.
export const checkRecvNote = async (user_id: string) => {
  try {
    const { count, error } = await supabase
      .from('note')
      .select('*', {
        count: 'exact',
      })
      .eq('recv_id', user_id)
      .is('read_at', null);

    if (error) {
      alert(
        '에러 발생. 에러 코드를 오류 신고 게시판에 남겨주세요.\n' +
          JSON.stringify(error),
      );
    }
    return count;
  } catch (error) {
    throw error;
  }
};

// 읽음 표시
export const readRecvNote = async (params: readNoteType): Promise<void> => {
  try {
    const currentTimestamp = new Date();

    const updateReadAt = { read_at: currentTimestamp };

    const { error } = await supabase
      .from('note')
      .update(updateReadAt)
      .eq('id', params.noteId)
      .eq('recv_id', params.userId);

    if (error) {
      alert(
        '에러 발생. 에러 코드를 오류 신고 게시판에 남겨주세요.\n' +
          JSON.stringify(error),
      );
    }
  } catch (error) {
    throw error;
  }
};

// 삭제
export const deleteNote = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase.from('note').delete().eq('id', id);

    if (error) {
      alert(
        '에러 발생. 에러 코드를 오류 신고 게시판에 남겨주세요.\n' +
          JSON.stringify(error),
      );
    }
  } catch (error) {
    throw error;
  }
};
