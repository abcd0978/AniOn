export type noteType = {
  send_id: string;
  recv_id: string;
  title: string;
  content: string;
  nickname?: string;
};

export type fetchNoteType = {
  user_id: string;
  type: string;
  page: number;
  itemsPerPage: number;
};
