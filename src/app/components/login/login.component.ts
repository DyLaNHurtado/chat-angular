import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SocketProviderConnect } from 'src/app/web-socket.service';
import jwt_decode from 'jwt-decode';

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

  errorStateMatcher = new MyErrorStateMatcher();
  hide = true;
  @Output() setRegister = new EventEmitter();
  public entityForm!: FormGroup;
  public inputEmail!: string;
  public inputPass!: string;
  constructor(public dialog: MatDialog,private router:Router,private cookieService: CookieService,public socket:SocketProviderConnect) {
    
  }

  ngOnInit() {
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
        alert("Hola");
        const tokenInfo = this.getDecodedAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDA0ZTRiNzE5ODFjMDQ2MjNkM2ZiMCIsImVtYWlsIjoiZHlsYW5odXJ0YWRvNDNAZ21haWwuY29tIiwiaWF0IjoxNjUwMzAxMjI0LCJleHAiOjE2NTAzODc2MjR9.mZqwdjL87gJgWrN2-vRDInRpuEjfRCZLa4uSaDiX_lQ"); // decode token
        const expireDate = tokenInfo.exp; // get token expiration dateTime
        console.log(tokenInfo);
        this.socket.connect();
        this.cookieService.set("payload",JSON.stringify(
          {
            user:this.inputEmail,
             
          }
      ));
        this.router.navigate(["../home"]).then(() => {
          window.location.reload();
        });
    }else{
      this.dialog.open(FieldsDialog);
    }
  }
  private validateToSend():boolean{
    if(this.inputEmail.trim()!=""&&this.inputPass!=""&&this.inputEmail.includes("@")){
      return true
    }
    return false;
  }

}


@Component({
  selector: 'fields-dialog',
  templateUrl: '../register/fields.dialog.html',
})
export class FieldsDialog {
}
function skipLocationChange() {
  throw new Error('Function not implemented.');
}

