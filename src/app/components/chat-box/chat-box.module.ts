import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {ChatMessageModule} from '../chat-message/chat-message.module'
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { AudioDialogModule } from '../audio-dialog/audio-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PickerModule,
    MatCardModule,
    MatIconModule,
    ChatMessageModule,
    MatMenuModule,
    MatDialogModule,
    AudioDialogModule
    
  ],
  declarations: [ChatBoxComponent],
  exports:[ChatBoxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatBoxModule { }
