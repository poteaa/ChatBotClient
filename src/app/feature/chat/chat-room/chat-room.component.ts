import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../shared/chat.service';
import { Message } from '../shared/models/message';
import { ChatRoom } from '../shared/models/chatroom';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../auth/shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.less']
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  id: number;
  chatRoom: ChatRoom;
  messageText = '';
  messageSubscription: Subscription;
  authorId: number;

  constructor(private route: ActivatedRoute,
              private chatService: ChatService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];
                    this.chatService.getChatRoom(this.id)
                      .subscribe(cr => {
                        this.chatRoom = cr;
                        this.chatService.joinRoom(this.chatRoom.name);
                        this.authorId = this.authService.loggedUser.id;
                        this.messageSubscription =
                          this.chatService.messageReceived
                            .subscribe((message: Message) => {
                              if (message.authorId !== this.authorId) {
                                this.chatRoom.messages.push(message);
                              }
                            });
                      });
                }
            );
  }

  send() {
    const message = {
      id: 0,
      body: this.messageText,
      authorId: this.authService.loggedUser.id,
      authorName: this.authService.loggedUser.username,
      chatRoomId: this.id,
      chatRoomName: this.chatRoom.name
    };
    this.chatRoom.messages.push(message);
    this.messageText = '';
    this.chatService.sendMessage(message)
      .subscribe(() => console.log('sent message'));
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this.chatService.leaveRoom(this.chatRoom.name);
    this.chatService.unsubscribe();
  }

}
