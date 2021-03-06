import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginModule } from '../login/login.module';
import { RegisterModule } from '../register/register.module';
import {MatToolbarModule} from '@angular/material/toolbar';
 import {MatMenuModule} from '@angular/material/menu';
import { MainRoutingModule } from './main.routing';
import { HomeModule } from '../home/home.module';
import { AboutUsModule } from '../aboutUs/aboutUs.module';
import { SettingsModule } from '../settings/settings.module';


@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LoginModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    RegisterModule,
    MatMenuModule,
    MatToolbarModule,
    HomeModule,
    AboutUsModule,
    SettingsModule
  ],
  declarations: [MainComponent],
  exports:[MainComponent]
})
export class MainModule { }
