import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideocallComponent } from './videocall.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [VideocallComponent],
  exports:[VideocallComponent]
})
export class VideocallModule { }
