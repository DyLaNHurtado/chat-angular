import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { HubConnection, HubConnectionBuilder, LogLevel, Subject } from '@microsoft/signalr';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class SignalrClientService {
  
    userName: string;
    connection: signalR.HubConnection;
    messenger = new Subject<ReceiveMessage>();
    onlineUsers = new Subject<User[]>();
  
    constructor() {
    }
  
    sendMessage(message: string) {
      return this.connection.invoke("SendMessage", this.userName, message)
    }
    openConnection() {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.chatURL}?username=${this.userName}`)
        .build();
  
      this.connection.start().then(res => {
        console.log("connected");
      });
      // add handler
      this.chatMessageHandler();
    }
    chatMessageHandler() {
      this.connection.on("ReceiveMessage", (user, message) => {
        this.messenger.next({
          userName: user, message: message, isSender: false
        });
      });
      this.connection.on("OnlineUsers", (user: User[]) => {
        //console.log("user", user);
        this.onlineUsers.next(user);
      });
    }
  }
   