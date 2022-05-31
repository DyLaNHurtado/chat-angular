import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SecurityContext, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { HttpclientService } from 'src/app/httpclient.service';
import { AudioDialogComponent } from '../audio-dialog/audio-dialog.component';
import { ImageDialog } from '../chat-box/chat-box.component';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
//iNPUTS USUARIOS HORA ETC
  @Input() text: string;
  @Input() time:string;
  @Input() author:string;
  @Input() equalDate:boolean;
  @Input() date:string;
  @Input() type:string;
  @Input() url:string;
  @Input() audiosList:string[];
  @Input() videosList:string[];
  @Input() imagesList:string[];
  userId:string;
  constructor(private dialog: MatDialog,private cookieService:CookieService,public httpService:HttpclientService,private _sanitizer: DomSanitizer,private ref: ChangeDetectorRef) { }
  
  ngOnInit() {
    this.userId=this.userId=JSON.parse(this.cookieService.get('payload')).id;
    this.getMediaApi();
    
  }

    private getMediaApi(){
      if(this.getIndexByUrl(this.audiosList)!= -1 || this.getIndexByUrl(this.imagesList)!= -1 || this.getIndexByUrl(this.videosList)!= -1){
        if(this.type == "audio"){
          this.httpService.getFile(this.audiosList[this.getIndexByUrl(this.audiosList)].replace("uploads/",""))
        .subscribe(res => {
         if(res.status == 200){
           let reader = new FileReader();
           reader.readAsDataURL(res.body);
             reader.onload = () => {
               this.base64dataToAudio(reader.result);
             }
         }
         },
         (errorRes:HttpErrorResponse) => {
           console.error(errorRes);
         });
        }else if(this.type=="video"){
          this.httpService.getFile(this.videosList[this.getIndexByUrl(this.videosList)].replace("uploads/",""))
        .subscribe(res => {
         if(res.status == 200){
           let reader = new FileReader();
           reader.readAsDataURL(res.body);
             reader.onload = () => {
               this.base64dataToVideo(reader.result);
             }
         }
         },
         (errorRes:HttpErrorResponse) => {
           console.error(errorRes);
         });
        }else{
          this.httpService.getFile(this.imagesList[this.getIndexByUrl(this.imagesList)].replace("uploads/",""))
        .subscribe(res => {
         if(res.status == 200){
           let reader = new FileReader();
           reader.readAsDataURL(res.body);
             reader.onload = () => {
               this.base64dataToImage(reader.result);
             }
         }
         },
         (errorRes:HttpErrorResponse) => {
           console.error(errorRes);
         });
        }
      }
    }

    private base64dataToAudio(base64data: string | ArrayBuffer) : void {
       if(!base64data){
         this.getMediaApi();
       }else{
        let htmlAudios = document.getElementsByClassName('audio-messages');
        let currentAudioHtml = htmlAudios[this.getIndexByUrl(this.audiosList)];
        currentAudioHtml.setAttribute("src",this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,this._sanitizer.bypassSecurityTrustResourceUrl(base64data.toString())));
        this.ref.detectChanges();
       }
  }

  private base64dataToVideo(base64data: string | ArrayBuffer) : void {
    if(!base64data){
      this.getMediaApi();
    }else{
     let htmlVideos = document.getElementsByClassName('video-messages');
     let currentVideoHtml = htmlVideos[this.getIndexByUrl(this.videosList)];
     currentVideoHtml.setAttribute("src",this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,this._sanitizer.bypassSecurityTrustResourceUrl(base64data.toString())));
     this.ref.detectChanges();
    }
}

private base64dataToImage(base64data: string | ArrayBuffer) : void {
  if(!base64data){
    this.getMediaApi();
  }else{
   let htmlImages = document.getElementsByClassName('image-messages');
   let currentImageHtml = htmlImages[this.getIndexByUrl(this.imagesList)];
   currentImageHtml.setAttribute("src",this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,this._sanitizer.bypassSecurityTrustResourceUrl(base64data.toString())));
   this.ref.detectChanges();
  }
}

  private getIndexByUrl(list: string[]): number{
    for(let i = 0; i < list.length; i++){
      if(list[i] == this.url){
        return i;
      }
    }
    return -1;
  }
  
  public openImageDialog(event): void {
    this.dialog.open(ImageDialog, {
      data: { img: event.target.src.replace('data:application/octet-stream','data:image/png')},
      panelClass:"dialog"
    });
  }

}
