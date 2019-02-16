import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'chat-bot-client';
  private _hubConnection: HubConnection;
  messages: { author, message }[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
