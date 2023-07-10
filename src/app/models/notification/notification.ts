export interface Notification {
  id: string,
  message: string,
  profileId: string,
  hasRead: boolean,
  originName: string,
  matIconName: string,
  notificationType: string,
  viewed: boolean,
  username: string,
  createTime: string
}
