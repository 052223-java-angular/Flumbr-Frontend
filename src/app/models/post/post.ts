import { Tag } from '../tag/tag';
import { Comment } from './comment';
import { UserVote } from './userVote';
import { UserBookmark } from './userBookmark';
import { Share } from './share';
import { User } from './user';
import { Mention } from './mention';

export interface PostRes {
  id: string;
  username: string;
  userId: string;
  message?: string;
  s3Url?: string;
  profileImg?: string;
  mediaType?: string;
  upVotes: number;
  downVotes: number;
  userVote?: UserVote;
  bookmarked?: UserBookmark;
  shared?: Share;
  createTime: string;
  editTime?: string;
  comments?: Array<Comment>;
  tags?: Array<Tag>;
  mentions?: Array<Mention>;
  shareCount: number;
  sharedBy?: Array<User>;

  // additional options
  animateDelete?: boolean;
}
