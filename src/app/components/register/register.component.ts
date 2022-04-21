import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpclientService } from 'src/app/httpclient.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  error:boolean=false;
  errorMsg:string;
  hide:boolean=true;
  hide2:boolean=true;
  entityForm!:FormGroup;
  inputName!:string;
  inputLastName!:string;
  inputEmail!:string;
  inputPass!:string;
  inputConfirmPass!:string;
  themeDark:boolean;
  @Output() setLogin=new EventEmitter();
  
  constructor(public dialog: MatDialog,private router:Router,private cookieService:CookieService,public httpService:HttpclientService) { }

  ngOnInit() {
    this.error=false;
    this.setTheme();
    this.entityForm = new FormGroup({
      inputName: new FormControl("", [Validators.required]),
      inputLastName: new FormControl("", [Validators.required]),
      inputEmail: new FormControl("", [Validators.email,Validators.required]),
      inputPass: new FormControl("", [Validators.required]),
      inputConfirmPass: new FormControl("", [Validators.required]),
    })
  }

  private setTheme(){
    if(JSON.parse(localStorage.getItem('theme'))==1){
      this.themeDark=true;
    }else{
      this.themeDark=false;
    }
  }


  public sendInputValues(){
    this.inputName=this.entityForm.get('inputName')!.value;
    this.inputLastName=this.entityForm.get('inputLastName')!.value;
    this.inputEmail=this.entityForm.get('inputEmail')!.value;
    this.inputPass=this.entityForm.get('inputPass')!.value;
    this.inputConfirmPass=this.entityForm.get('inputConfirmPass')!.value;
    if(this.validateToSend()){
      if(this.inputPass==this.inputConfirmPass){
        //Api llamada 

        this.httpService.register({"name":this.inputName,"lastname":this.inputLastName,"email":this.inputEmail,"password":this.inputPass,"avatar":`https://ui-avatars.com/api/?name=${this.inputName}+${this.inputLastName}&background=random&format=svg`})
        .subscribe(res => {
          console.log(res.status);
          if(res.status == 200){
            this.error=false;
            console.log(res.body);
            const token=res.body
            console.log(token);
          }
          },
          (errorRes:HttpErrorResponse) => {
              this.error=true;
              this.errorMsg=errorRes.error.error
          
          });





        alert("Hola");
        this.router.navigate(['../login'])
      }else{
        this.error=false;
        setTimeout(()=>{this.error=true},200)
        this.errorMsg="❌ Passwords do not match";
      }
    }else{
      this.error=false;
      setTimeout(()=>{this.error=true},200)
      this.errorMsg="❌ Invalid email or/and password";
    }
  }
  private validateToSend():boolean{
    if(this.inputName.trim()!=""&&
    this.inputLastName.trim()!=""&&
    this.inputEmail.trim()!=""&&
    this.inputEmail.includes('@')&&
    this.inputPass!=""&&
    this.inputConfirmPass!=""){
      return true
    }
    return false;
  }

  public showLogin(){
    this.router.navigate(['../login']);
  }
}
