import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ChatBoxModule } from '../chat-box/chat-box.module';
import { ContactListModule } from '../contact-list/contact-list.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ChatBoxModule,
    ContactListModule,
  ],
  declarations: [HomeComponent],
  exports:[HomeComponent]
})
export class HomeModule { }
