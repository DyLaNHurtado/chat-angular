import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SignalrClientService } from './signalr.client.serives';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message: string;
  chatContainer: ReceiveMessage[] = [];
  onlineUsers: User[];
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private _signalrClientService: SignalrClientService) {
    
    this.subscription = new Subscription();
    
    //subscribing chat message and online user details
    this.subscription.add(this._signalrClientService.messenger.subscribe((res: ReceiveMessage) => {
      this.chatContainer.push(res);
    }));
    this.subscription.add(this._signalrClientService.onlineUsers.subscribe((res: User[]) => {
      this.onlineUsers = res;
    }));
    
  }

  ngOnInit(): void {
    this.openUserDialog();
  }
  openUserDialog() {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

onSendMessage() {
  this._signalrClientService.sendMessage(this.message).then(res => {
    this.chatContainer.push({ message: this.message, userName: this._signalrClientService.userName, isSender: true })
  });
}
openUserDialog() {
  const dialogRef = this.dialog.open(UserDetailsComponent, { hasBackdrop: false });
  dialogRef.afterClosed().subscribe((userName: string) => {
    this.connectHub(userName);
  });
}
connectHub(userName: string) {
  this._signalrClientService.userName = userName;
  this._signalrClientService.openConnection();
}

