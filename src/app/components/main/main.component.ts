import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpclientService } from 'src/app/httpclient.service';
import { SocketProviderConnect } from 'src/app/web-socket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  themeDark:boolean;
  avatar:string ="https://raw.githubusercontent.com/DyLaNHurtado/chat-angular/develop/src/assets/img/loading-gif.gif";
  user:any;
  constructor(private router:Router,public socket:SocketProviderConnect,public httpService:HttpclientService,private cookieService:CookieService,private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getImageApi();
    document.addEventListener('startSettings',(event)=>{
      event.preventDefault();
      this.setTheme();
      window.location.reload();
    });
    
    window.addEventListener("storage",(event)=>{
      event.preventDefault();
      this.setTheme();
    },false);
  }

  public base64dataToImage(base64data) : void {
    this.avatar = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,this._sanitizer.bypassSecurityTrustResourceUrl(base64data));
  }

  private setTheme(){
    if(JSON.parse(localStorage.getItem('theme'))==1){
      this.themeDark=true;
    }else{
      this.themeDark=false;
    }
  }

  public goHome(){
    this.router.navigate(["../home"]);
  }
  public goProfile(){
    this.router.navigate(["../profile"]);
  }
  public goLogout(){
    this.socket.emit('removeConnected',this.user.name);
    this.socket.disconnect();
    this.router.navigate(["../login"]);
    this.resetLocalStorage();
  }
  public goAboutUs(){
    this.router.navigate(["../aboutUs"]);
  }
  public goSettings(){
    this.router.navigate(["../settings"]);
  }

  private resetLocalStorage(){
    localStorage.setItem('contact',JSON.stringify(""));
    this.cookieService.set('token','');
    this.cookieService.set('payload','');
  }

  private getImageApi(){

    this.httpService.getUserByEmail(this.cookieService.get('token'),JSON.parse(this.cookieService.get('payload')).email)
      .subscribe(res => {
      if(res.status == 200){
        this.user=res.body[0];
        }
        
        document.dispatchEvent(new Event("gotUserMain",{bubbles:false,cancelable:true}));
 },
 (errorRes:HttpErrorResponse) => {
   console.error(errorRes);
 });

  document.addEventListener('gotUserMain',(event)=>{
    event.preventDefault();
    if(!this.user.avatar.includes("https://ui-avatars.com/api/")){
  this.httpService.getFile(this.user.avatar.replace("uploads/",""))
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
     }).unsubscribe;
    }else{
      this.avatar = this.user.avatar;
    }
  },{once:true});
  }
  
}
