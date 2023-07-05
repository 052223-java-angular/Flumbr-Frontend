import { Tag } from '../tag/tag';

export interface PostRes {
  id: string;
  userId: string;
  username: string;
  profileImg: string;
  message?: string;
  s3bucket?: string;
  mediaType?: string;
  tags?: Array<Tag>;
  following: boolean;
  createTime: string;
  editTime?: string;
}
