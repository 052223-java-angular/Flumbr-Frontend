import { UserVote } from './userVote';

export interface Comment {
  userId: string;
  commentId: string;
  username: string;
  profileImg?: string;
  comment?: string;
  createTime: string;
  editTime?: string;
  postId: string;
  userVote?: UserVote;
  gifUrl?: string;
}

export interface NewCommentReq {
  comment?: string;
  postId: string;
  userId: string;
  gifUrl?: string;
}
