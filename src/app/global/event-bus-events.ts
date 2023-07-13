export class EventBusEvents {
  public static POST = 'post:';
  public static POST_CREATE = `${this.POST}create`;
  public static POST_UPDATE = `${this.POST}update`;
  public static POST_DELETE = `${this.POST}delete`;
  public static FOLLOW = 'follow:';
  public static FOLLOW_FOLLOW = `${this.FOLLOW}follow`;
  public static FOLLOW_UNFOLLOW = `${this.FOLLOW}unfollow`;
}
