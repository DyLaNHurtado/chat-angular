import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
//iNPUTS USUARIOS HORA ETC
  @Input() text: string;
  @Input() time:string;
  @Input() author:string;
  @Input() equalDate:boolean;
  @Input() date:string;
  userId:string;
  constructor(private cookieService: CookieService) { }
  
  ngOnInit() {
    this.userId=this.userId=JSON.parse(this.cookieService.get('payload')).id;
  }

}
