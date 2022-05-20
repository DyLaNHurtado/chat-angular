import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-audio-dialog',
  templateUrl: './audio-dialog.component.html',
  styleUrls: ['./audio-dialog.component.scss']
})
export class AudioDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AudioDialogComponent>) { }

  ngOnInit() {

  }

  close(){
    const dialogResponse = this.dialogRef.close();
  }

  send(){
    const dialogResponse = this.dialogRef.close();
  }

}
