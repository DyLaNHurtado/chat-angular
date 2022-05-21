import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';

@Component({
  selector: 'app-audio-dialog',
  templateUrl: './audio-dialog.component.html',
  styleUrls: ['./audio-dialog.component.scss']
})
export class AudioDialogComponent implements OnInit {
  minutes:number; 
  seconds:number;
  interval;
  
  constructor(private dialogRef: MatDialogRef<AudioDialogComponent>,private audioRecorderService: NgAudioRecorderService) {
    this.seconds=0;
    this.minutes=0;
   }
  
  ngOnInit() {
    this.audioRecorderService.getUserContent().then(()=>{
      this.interval = setInterval(this.tick.bind(this),1000);
      this.startRecording();
    });
  }
  private startRecording():void {
    
      this.audioRecorderService.startRecording();
    
    
  }

  private sendRecording():void {
    this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output) => {
      console.log(output);
      
     // do post output steps
  }).catch(errrorCase => {
      console.error(errrorCase);
  });
}

private stopRecording():void {
  this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB);
}

  public tick():void{
    this.seconds++;
    if ( this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
    }
   
    console.log(this.seconds);
  }

  close():void{
    clearInterval(this.interval);
    this.stopRecording();
    const dialogResponse = this.dialogRef.close();
  }

  send():void{
    clearInterval(this.interval);
    this.sendRecording();
    const dialogResponse = this.dialogRef.close();
  }

}
