import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideocallComponent } from './videocall.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule
  ],
  declarations: [VideocallComponent],
  exports:[VideocallComponent]
})
export class VideocallModule { }
