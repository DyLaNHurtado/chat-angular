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
  static base64data:any;
  userId:string;
  constructor(private cookieService:CookieService,public httpService:HttpclientService,private _sanitizer: DomSanitizer,private ref: ChangeDetectorRef) { }
  
  ngOnInit() {
    this.userId=this.userId=JSON.parse(this.cookieService.get('payload')).id;
  }

    private getMediaApi(){
      this.httpService.getFile(this.url.replace("uploads/",""))
      .subscribe(res => {
       if(res.status == 200){
         var reader = new FileReader();
         reader.readAsDataURL(res.body);
           reader.onload = () => {
             AudioDialogComponent.base64data = reader.result;
             document.dispatchEvent(new Event("mediaReadedChatMessage",{bubbles:false,cancelable:true}));
           }
           document.addEventListener('mediaReadedChatMessage',(event)=>{
            event.stopPropagation();
             this.base64dataToImage();
            });
       }
       },
       (errorRes:HttpErrorResponse) => {
         console.error(errorRes);
       });

    }
    public base64dataToImage() : void {

      if(!AudioDialogComponent.base64data){
        console.log("nooo");
        this.getMediaApi();
      }else{
        console.log("siiii");
        
        this.audioMedia = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,this._sanitizer.bypassSecurityTrustResourceUrl(AudioDialogComponent.base64data));
        let audioHtml  =  <HTMLVideoElement> <unknown>document.getElementsByTagName("source")[document.getElementsByTagName("source").length - 1]
        audioHtml.pause();
        audioHtml.load();
        this.ref.detectChanges();
        console.log(this.audioMedia);
      }
  }
}
