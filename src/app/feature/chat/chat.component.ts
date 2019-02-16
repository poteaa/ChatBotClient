import { Component, OnInit } from '@angular/core';
import { SignalrService } from './shared/signalr.service';
import { ChatRoom } from './shared/models/chatroom';
import { ChatService } from './shared/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {

  chats: ChatRoom[];
  constructor(private chatService: ChatService,
              private signalrService: SignalrService) { }

  ngOnInit() {
    this.chatService.getChatRooms()
      .subscribe((chats) => this.chats = chats);
    // this.signalrService.receiveData()
  }

}
