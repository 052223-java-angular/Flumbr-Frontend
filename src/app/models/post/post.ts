import { Tag } from '../tag/tag';
import { Comment } from './comment';
import { UserVote } from './userVote';

export interface PostRes {
  id: string;
  username: string;
  message?: string;
  s3Url?: string;
  profileImg?: string;
  mediaType?: string;
  upVotes: number;
  downVotes: number;
  userVote?: UserVote;
  createTime: string;
  editTime?: string;
  comments?: Array<Comment>;
  tags?: Array<Tag>;

  // additional options
  animateDelete?: boolean;
  userId?: string;
}
