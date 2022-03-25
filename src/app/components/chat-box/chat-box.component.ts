import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  public textArea: string = '';
  public isEmojiPickerVisible: boolean;

  constructor() { }

  ngOnInit() {
  }

  public addEmoji(event) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
 } 
}
