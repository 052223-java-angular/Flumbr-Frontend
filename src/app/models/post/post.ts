import { Tag } from '../tag/tag';

export interface PostRes {
  username: string;
  profileImg: string;
  message?: string;
  s3bucket?: string;
  mediaType?: string;
  tags?: Array<Tag>;
}
