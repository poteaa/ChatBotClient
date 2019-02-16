import { Component, OnInit, Input } from '@angular/core';
import { ChatRoom } from '../shared/models/chatroom';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.less']
})
export class ChatItemComponent implements OnInit {

  @Input() chat: ChatRoom;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToRoom() {
    this.router.navigate([`/chatroom/${this.chat.id}`]);
  }

}
