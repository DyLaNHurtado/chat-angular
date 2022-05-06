import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SocketProviderConnect } from 'src/app/web-socket.service';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpclientService } from 'src/app/httpclient.service';

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
  @Output() setRegister = new EventEmitter();
  public entityForm!: FormGroup;
  public inputEmail!: string;
  public inputPass!: string;
  constructor(public dialog: MatDialog,private router:Router,private cookieService: CookieService,public socket:SocketProviderConnect,public httpService:HttpclientService) {
    
  }

  ngOnInit() {
    this.socket.disconnect();
    this.error=false;
    this.entityForm = new FormGroup({
      inputEmail: new FormControl("", [Validators.email,Validators.required]),
      inputPass: new FormControl("", [Validators.required])
    });
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
        //Api llamada
       
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
      console.log(res.status);
      if(res.status == 200){
        
        this.error=false;
        console.log(res.body);
        const token=res.body.token
        console.log(token);
        const tokenInfo = this.getDecodedAccessToken(token);
        console.log(tokenInfo);
        
        this.cookieService.set("token",token);
        
        this.cookieService.set("payload",JSON.stringify(this.getDecodedAccessToken(token)));
        document.dispatchEvent(new Event('tokenReady'));
        this.socket.connect();
        this.router.navigate(["../home"]);
      }
      },
      (errorRes:HttpErrorResponse) => {
          this.error=true;
          this.errorMsg=errorRes.error.error
      
      });
  }

  private setUserSettings(){
    document.addEventListener('tokenReady',()=>{
      console.log("tokenReady");
      
      this.httpService.getUserByEmail(this.cookieService.get('token'),this.inputEmail)
      .subscribe(res => {
        console.log(res.status);
        if(res.status == 200){
          let user = res.body[0];
          console.log(res.body);
          
          localStorage.setItem('theme',JSON.stringify(user.theme));
          localStorage.setItem('bg_color',JSON.stringify(user.bgColor));
          localStorage.setItem('bg',JSON.stringify(user.background));
          document.dispatchEvent(new Event('startSettings'));
        }
        },
        (errorRes:HttpErrorResponse) => {
            this.error=true;
            this.errorMsg=errorRes.error.error
        
        });
    });
    }
    


}


