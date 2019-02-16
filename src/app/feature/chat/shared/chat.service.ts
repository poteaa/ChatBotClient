import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { SignalrService } from './signalr.service';
import { HttpBackendService } from '../../../core/http/http-backend.service';
import { Message } from './models/message';
import { ChatRoom } from './models/chatroom';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messageReceived = new Subject<Message>();
  private readonly chatRoomsUrl = 'chatrooms';
  private readonly chatMessagesUrl = 'messages';
  private receiveMessageSubs: Subscription;

  constructor(private signalrService: SignalrService,
              private httpBackendService: HttpBackendService) {
    console.log('ChatService instanciated.');
  }

  getChatRooms(): Observable<ChatRoom[]> {
    return this.httpBackendService.get<ChatRoom[]>(this.chatRoomsUrl);
  }

  getChatRoom(id: number): Observable<ChatRoom> {
    return this.httpBackendService.get<ChatRoom>(`${this.chatRoomsUrl}/${id}`)
            .pipe(map(chat => {
              this.receiveMessageSubs = this.signalrService.onReceiveMessage()
                .subscribe((message: Message) => {
                  this.messageReceived.next(message);
                });
              return chat;
            }));
  }

  sendMessage(message: Message): Observable<Message> {
    return this.httpBackendService.post<Message, Message>('Messages', message);
  }

  sendMessageUsingSignalR(message: Message) {
    this.signalrService.broadcastmessage(message);
  }

  joinRoom(roomName: string) {
    this.signalrService.joinRoom(roomName);
  }

  leaveRoom(roomName: string) {
    this.signalrService.leaveRoom(roomName);
  }

  unsubscribe() {
    if (this.receiveMessageSubs) {
      this.receiveMessageSubs.unsubscribe();
    }
    this.signalrService.finishReceiveMsgObs();
  }

}
