import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { environment } from './../../../../environments/environment';
import { Message } from './models/message';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private _hubConnection: HubConnection;
  private receiveMsgObs: Observer<Message>;

  constructor() {
    console.log('SignalrService instanciated.');
    this._hubConnection = new HubConnectionBuilder()
                            .withUrl(environment.signalRUrl)
                            .build();
    this._hubConnection
      .start()
      .then(() => console.log('Connected to chat'))
      .catch(err => console.log(`Error connecting to the chat: ${err}`));

    // this._hubConnection.on('receivemessage', (messsage: Message) => {
    //   console.log(`Messages: ${this.messages}`);
    // });
  }

  onReceiveMessage(): Observable<Message> {
    return Observable.create((observer: Observer<Message>) => {
      this.receiveMsgObs = observer;
      this._hubConnection.on('receivemessage', (message: Message) => {
        observer.next(message);
      });
    });
  }

  joinRoom(roomName: string) {
    this._hubConnection.invoke('joinroom', roomName)
    .catch(err => console.error(err));
  }

  leaveRoom(roomName: string) {
    this._hubConnection.invoke('leaveroom', roomName)
    .catch(err => console.error(err));
  }

  broadcastmessage(message: Message) {
    this._hubConnection.invoke('broadcastmessage', message)
    .catch(err => console.error(err));
  }

  finishReceiveMsgObs() {
    this.receiveMsgObs.complete();
    this._hubConnection.off('receivemessage');
  }

}
