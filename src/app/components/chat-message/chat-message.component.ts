import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SecurityContext, SimpleChanges } from '@angular/core';
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
  @Input() audiosList:string[];
  audioMedia:string;
  static base64data:any;
  userId:string;
  constructor(private cookieService:CookieService,public httpService:HttpclientService,private _sanitizer: DomSanitizer,private ref: ChangeDetectorRef) { }
  
  ngOnInit() {
    this.userId=this.userId=JSON.parse(this.cookieService.get('payload')).id;
    this.getMediaApi();
    console.log(this.getIndexByUrl());
  }

    private getMediaApi(){
      if(this.getIndexByUrl()!= -1){
        console.log(this.audiosList[this.getIndexByUrl()]);
        
        this.httpService.getFile(this.audiosList[this.getIndexByUrl()].replace("uploads/",""))
        .subscribe(res => {
         if(res.status == 200){
           var reader = new FileReader();
           reader.readAsDataURL(res.body);
             reader.onload = () => {
               AudioDialogComponent.base64data = reader.result;
               document.dispatchEvent(new Event("mediaReadedChatMessage",{bubbles:false,cancelable:true}));
             }
             document.addEventListener('mediaReadedChatMessage',(event)=>{
               event.preventDefault();
               this.base64dataToImage();
              },{once:true});
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
        this.audioMedia = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,this._sanitizer.bypassSecurityTrustResourceUrl(AudioDialogComponent.base64data));
        this.ref.detectChanges();
       }
  }

  private getIndexByUrl(){
    for(let i = 0; i < this.audiosList.length; i++){
      if(this.audiosList[i] == this.url){
        return i;
      }
    }
    return -1;
  }
}
