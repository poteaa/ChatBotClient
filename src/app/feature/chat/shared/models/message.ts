export interface Message {
  id: number;
  authorId: number;
  authorName: string;
  chatRoomId: number;
  chatRoomName: string;
  body: string;
}
