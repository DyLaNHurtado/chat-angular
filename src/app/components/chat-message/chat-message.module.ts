import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from './chat-message.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatDateModule } from '../chat-date/chat-date.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    ChatDateModule

  ],
  declarations: [ChatMessageComponent],
  exports: [ChatMessageComponent]
})
export class ChatMessageModule { }
