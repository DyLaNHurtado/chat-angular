import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import { LoginModule } from './components/login/login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterModule } from './components/register/register.module';
import { ContactListModule } from './components/contact-list/contact-list.module';
import { ChatBoxModule } from './components/chat-box/chat-box.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    LoginModule,
    MatButtonModule,
    RegisterModule,
    ContactListModule,
    ChatBoxModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
