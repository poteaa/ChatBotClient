import { Message } from './message';

export interface ChatRoom {
    id: number;
    name: string;
    messages: Message[];
}
