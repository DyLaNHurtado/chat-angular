import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SocketProviderConnect } from 'src/app/web-socket.service';
import jwt_decode from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpclientService } from 'src/app/httpclient.service';
import { JwtHelperService } from 'src/app/jwt-helper.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error:boolean=false;
  errorMsg:string;
  errorStateMatcher = new MyErrorStateMatcher();
  hide = true;
  onCalling:boolean=false;
  @Output() setRegister = new EventEmitter();
  public entityForm!: FormGroup;
  public inputEmail!: string;
  public inputPass!: string;
  constructor(public dialog: MatDialog,private router:Router,private cookieService: CookieService,public socket:SocketProviderConnect,public httpService:HttpclientService,public jwtService:JwtHelperService
  ) {
    
  }

  ngOnInit() {
    this.socket.disconnect();
    this.error=false;
    this.entityForm = new FormGroup({
      inputEmail: new FormControl("", [Validators.email,Validators.required]),
      inputPass: new FormControl("", [Validators.required])
    });
    
    if(this.cookieService.get('token')!="" && this.cookieService.get('payload')!=""){
      if (this.jwtService.isTokenValid(this.cookieService.get('token'))) {
        this.socket.connect();
        this.router.navigate(["../home"]);
      }
    }
    
  }
  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  public showRegister(){
    this.router.navigate(["../register"]);
  }
  public sendInputValues(){
    this.inputEmail=this.entityForm.get("inputEmail")!.value;
    this.inputPass=this.entityForm.get("inputPass")!.value;
    if(this.validateToSend()){
          this.loginApi();
          this.setUserSettings();        
        
    }else{
      this.error=false;
      setTimeout(()=>{this.error=true},200)
      this.errorMsg="❌ Invalid email or/and password"
    }
  }
  private validateToSend():boolean{
    if(this.inputEmail.trim()!=""&&this.inputPass!=""&&this.inputEmail.includes("@")){
      return true
    }
    return false;
  }

  private loginApi(){
    this.httpService.login({"email":this.inputEmail,"password":this.inputPass})
    .subscribe(res => {
      if(res.status == 200){
        this.error=false;
        const token=res.body.token
        const tokenInfo = this.getDecodedAccessToken(token);
        this.cookieService.set("token",token);
        this.cookieService.set("payload",JSON.stringify(this.getDecodedAccessToken(token)));
        document.dispatchEvent(new Event('tokenReady',{bubbles:false,cancelable:true}));
        this.socket.connect();
        this.router.navigate(["../home"]);
      }
      },
      (errorRes:HttpErrorResponse) => {
        console.log(errorRes);
          this.error=true;
          this.errorMsg=errorRes.error.error;
          
          
      });
  }

  private setUserSettings(){
    document.addEventListener('tokenReady',(event)=>{
      event.preventDefault();  
      this.httpService.getUserByEmail(this.cookieService.get('token'),this.inputEmail)
      .subscribe(res => {
        if(res.status == 200){
          let user = res.body[0];
          localStorage.setItem('theme',JSON.stringify(user.theme));
          localStorage.setItem('bg_color',JSON.stringify(user.bgColor));
          localStorage.setItem('bg',JSON.stringify(user.background));
          document.dispatchEvent(new Event('startSettings',{bubbles:false,cancelable:true}));
        }
        },
        (errorRes:HttpErrorResponse) => {
            this.error=true;
            this.errorMsg=errorRes.error.error
        });
    },{once:true});
    }
    



}


