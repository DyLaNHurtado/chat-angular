import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { HttpclientService } from 'src/app/httpclient.service';
import { AudioDialogComponent } from '../audio-dialog/audio-dialog.component';

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
  audioMedia:string;
  audioList:string[]=[];
  static base64data:any;
  userId:string;
  constructor(private cookieService:CookieService,public httpService:HttpclientService,private _sanitizer: DomSanitizer,private ref: ChangeDetectorRef) { }
  
  ngOnInit() {
    this.userId=this.userId=JSON.parse(this.cookieService.get('payload')).id;
    this.getMediaApi();
  }

    private getMediaApi(){
      if(this.url!==undefined){
        this.httpService.getFile(this.url.replace("uploads/",""))
        .subscribe(res => {
         if(res.status == 200){
           var reader = new FileReader();
           reader.readAsDataURL(res.body);
             reader.onload = () => {
               console.log("1");
               
               AudioDialogComponent.base64data = reader.result;
               document.dispatchEvent(new Event("mediaReadedChatMessage",{bubbles:false,cancelable:true}));
             }
             document.addEventListener('mediaReadedChatMessage',(event)=>{
               event.preventDefault();
               this.base64dataToImage();
              },false);
         }
         },
         (errorRes:HttpErrorResponse) => {
           console.error(errorRes);
         });
      }
      

    }
    public base64dataToImage() : void {

      if(!AudioDialogComponent.base64data){
        console.log("nooo");
        this.getMediaApi();
      }else{
        console.log("siiii");
        this.audioList.push(this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,this._sanitizer.bypassSecurityTrustResourceUrl(AudioDialogComponent.base64data)));
        console.log(this.audioList);
        
        let audiosHtml = document.getElementsByTagName("audio");
        if(document.getElementsByTagName("audio").length==1){
          let audio = <HTMLVideoElement> document.getElementsByTagName("audio")[0];
          audio.src=this.audioList[0];
          audio.pause();
          audio.load();

        }else{
              for (let i = 0; i < Array.from(audiosHtml).length; i++){
                  Array.from(audiosHtml)[i].src=this.audioList[i];
                  Array.from(audiosHtml)[i].pause();
                  Array.from(audiosHtml)[i].load();
                  console.log(Array.from(audiosHtml)[i]);
              }
        }
        console.log(this.audioMedia);
      }
  }
}
