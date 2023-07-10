import { UserVote } from './userVote';

export interface Comment {
  username: string;
  profileImg?: string;
  comment: string;
  createTime: string;
  editTime?: string;
  postId: string;
  userVote?: UserVote;
}
