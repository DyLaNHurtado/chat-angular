import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from './chat-message.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,

  ],
  declarations: [ChatMessageComponent],
  exports: [ChatMessageComponent]
})
export class ChatMessageModule { }
