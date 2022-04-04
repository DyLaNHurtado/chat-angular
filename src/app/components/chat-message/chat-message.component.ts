import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  public text:string="Hola! 🤪";
  public time:string = "18:30";
  constructor() { }
  
  ngOnInit() {
  }

}
