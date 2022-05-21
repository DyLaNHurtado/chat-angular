import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioDialogComponent } from './audio-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgAudioRecorderModule } from 'ng-audio-recorder';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    NgAudioRecorderModule
  ],
  declarations: [AudioDialogComponent],
  exports:[AudioDialogComponent]
})
export class AudioDialogModule { }
