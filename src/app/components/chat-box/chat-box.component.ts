import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  public textArea: string = '';
  public isEmojiPickerVisible: boolean;
  public themeDark:boolean;
  constructor() { }

  ngOnInit() {
    this.setTheme();
  }
  
  private setTheme(){
    if(JSON.parse(localStorage.getItem('theme'))==1){
      this.themeDark=true;
    }else{
      this.themeDark=false;
    }
  }
  public addEmoji(event) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
 } 
}
