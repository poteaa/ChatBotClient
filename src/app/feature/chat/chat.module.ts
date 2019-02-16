import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { ChatItemComponent } from './chat-item/chat-item.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ChatComponent, ChatItemComponent, ChatRoomComponent]
})
export class ChatModule { }
