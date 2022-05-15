import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDateComponent } from './chat-date.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
  ],
  declarations: [ChatDateComponent],
  exports:[ChatDateComponent]
})
export class ChatDateModule { }
