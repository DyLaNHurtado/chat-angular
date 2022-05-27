import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, SecurityContext } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
import { CookieService } from 'ngx-cookie-service';
import { HttpclientService } from 'src/app/httpclient.service';
import { SocketProviderConnect } from 'src/app/web-socket.service';

@Component({
  selector: 'app-audio-dialog',
  templateUrl: './audio-dialog.component.html',
  styleUrls: ['./audio-dialog.component.scss']
})
export class AudioDialogComponent implements OnInit {
  minutes:number;
  seconds:number;
  interval;
  lastAudio:any;
  audioTest:string="";
  static base64data:any;
  isRecording:boolean=true;
  
  constructor(private dialogRef: MatDialogRef<AudioDialogComponent>,private audioRecorderService: NgAudioRecorderService,private cookieService:CookieService,public httpService:HttpclientService,private _sanitizer: DomSanitizer,private ref: ChangeDetectorRef,public socket:SocketProviderConnect) {
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
      this.isRecording=true;
      this.audioRecorderService.startRecording();
  }

  private sendRecording():void {
    this.isRecording=false;
    this.socket.emit('messageSent',JSON.parse(localStorage.getItem('chatId')),JSON.parse(this.cookieService.get('payload')).id);
    this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output) => {
      console.log(output);
      this.uploadMediaApi(output);
  }).catch(errrorCase => {
      console.error(errrorCase);
  });
}

private stopRecording():void {
  this.isRecording=false;
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
    window.location.reload();
  }

  send():void{
    clearInterval(this.interval);
    this.sendRecording();
  }
  
  private uploadMediaApi(output){
    const fd = new FormData();
    fd.append('media', output, "media.webm");
  console.log(JSON.parse(this.cookieService.get('payload')).id);
  console.log(this.cookieService.get('token'));
  
   this.httpService.uploadMedia(JSON.parse(localStorage.getItem('chatId')),JSON.parse(this.cookieService.get('payload')).id,fd)
  .subscribe(res => {
    console.log(res.status);
    if(res.status == 200){
      document.dispatchEvent(new Event("audioUploadedDialog",{bubbles:false,cancelable:true}));
    }
    },
    (errorRes:HttpErrorResponse) => {
      console.error(errorRes);
    });
    document.addEventListener('audioUploadedDialog',(event)=>{
      event.stopPropagation();
      this.getMediaApi();},{once:true});
  }



  private getMediaApi(){
    
    this.httpService.getLastAudio()
    .subscribe(res => {
      console.log(res.status);
      if(res.status == 200){
        this.lastAudio=res.body;
        console.log(this.lastAudio);
        document.dispatchEvent(new Event("gotUserAudioDialog",{bubbles:false,cancelable:true}));
      }
      },
      (errorRes:HttpErrorResponse) => {
        console.log(errorRes);
      });
       


  document.addEventListener('gotUserAudioDialog',(event)=>{
    event.preventDefault();
    this.httpService.getFile(this.lastAudio.url.replace("uploads/",""))
      .subscribe(res => {
       if(res.status == 200){
         var reader = new FileReader();
         reader.readAsDataURL(res.body);
           reader.onload = () => {
            this.base64dataToImage(reader.result);
           }
       }
       },
       (errorRes:HttpErrorResponse) => {
         console.error(errorRes);
       });
    },{once:true});
  }



private base64dataToImage(base64data: string | ArrayBuffer) : void {

  if(!base64data){
    console.log("nooo");
    this.getMediaApi();
  }else{
    console.log("siiii");
    let htmlAudio = document.getElementById('dialog-audio');
    htmlAudio.setAttribute("src",this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,this._sanitizer.bypassSecurityTrustResourceUrl(base64data.toString())));
    this.ref.detectChanges();
  }
}

}
