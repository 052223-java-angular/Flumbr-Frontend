import { Tag } from '../tag/tag';
import { Comment } from './comment';

export interface PostRes {
  id: string;
  upVotes: number;
  downVotes: number;
  username: string;
  profileImg?: string;
  message?: string;
  s3Url?: string;
  mediaType?: string;
  tags?: Array<Tag>;
  createTime: string;
  editTime?: string;
  comments?: Array<Comment>;

  // additional options
  animateDelete?: boolean;
}
