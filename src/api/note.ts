import { toast } from 'react-toastify';
import supabase from '../supabaseClient';
import { findUserIdByNickname } from './auth';
import { insertNoteType } from '../types/note';

const fetchRecvNotes = async (params: any) => {
  try {
  } catch (error) {}
};

const fetchSentNotes = async (params: any) => {
  try {
  } catch (error) {}
};

export const createNote = async (params: any) => {
  try {
    const recv_id = await findUserIdByNickname(params.nickname!);
    // console.log(recv_id);
    if (recv_id === 'none' || !recv_id) {
      return 'none';
    }
    const newNote: insertNoteType = {
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

const deleteNote = async (params: any) => {
  try {
  } catch (error) {}
};
