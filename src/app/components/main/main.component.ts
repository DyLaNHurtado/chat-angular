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
  public static base64data:any;
  constructor(private router:Router,public socket:SocketProviderConnect,public httpService:HttpclientService,private cookieService:CookieService,private _sanitizer: DomSanitizer) { 
  }

  ngOnInit() {
    this.getImageApi();
    this.setTheme();
    window.addEventListener("storage", this.setTheme, false);
  }

  public base64dataToImage() : void {
    setTimeout(()=>{
      if(!MainComponent.base64data){
        console.log("nooo");
        this.getImageApi();
      }else{
        this.avatar = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,this._sanitizer.bypassSecurityTrustResourceUrl(MainComponent.base64data));
      }
    },1)
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
    localStorage.setItem('last',JSON.stringify(""));
    localStorage.setItem('bg',JSON.stringify("background-image: url(https://raw.githubusercontent.com/DyLaNHurtado/chat-angular/b814d3e449d34f6efe09a53964e64b7b379f2aa3/src/assets/img/bg-art.svg)"));
    localStorage.setItem('bg_color',JSON.stringify("background-color: #f3efea"));
    localStorage.setItem('theme',JSON.stringify("0"));
  }

  private getImageApi(){

    this.httpService.getUserByEmail(this.cookieService.get('token'),JSON.parse(this.cookieService.get('payload')).email)
      .subscribe(res => {
      console.log(res.status);
      if(res.status == 200){
        this.user=res.body[0];
   
 }
 },
 (errorRes:HttpErrorResponse) => {
   console.error(errorRes);
 });


setTimeout(()=>{
 this.httpService.getAvatar(this.user.avatar.replace("uploads/",""))
   .subscribe(res => {
     console.log(this.user.avatar);
     console.log(res.status);
    
    
     if(res.status == 200){
       var reader = new FileReader();
       reader.readAsDataURL(res.body);
         reader.onload = () => {
           MainComponent.base64data = reader.result;
         }
         setTimeout(()=>{
           this.base64dataToImage();
           console.log(res.body);
         },1000)
         reader.readAsText(res.body);
         
     }
     },
     (errorRes:HttpErrorResponse) => {
       console.error(errorRes);
     });
   },500)}
}
