import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotSelectedComponent } from './not-selected.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [NotSelectedComponent],
  exports: [NotSelectedComponent]
})
export class NotSelectedModule { }
