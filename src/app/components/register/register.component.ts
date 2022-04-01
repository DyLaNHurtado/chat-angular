import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  hide:boolean=true;
  entityForm!:FormGroup;
  inputName!:string;
  inputLastName!:string;
  inputEmail!:string;
  inputPass!:string;
  inputConfirmPass!:string;
  themeDark:boolean;
  
  @Output() setLogin=new EventEmitter();
  constructor(public dialog: MatDialog,private router:Router) { }

  ngOnInit() {
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
        alert("Hola");
        this.router.navigate(['../login'])
      }else{
        this.dialog.open(PasswordDialog);
      }
    }else{
      this.dialog.open(FieldsDialog);
    }
  }
  private validateToSend():boolean{
    if(this.inputName.trim()!=""&&
    this.inputLastName.trim()!=""&&
    this.inputEmail.trim()!=""&&
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

@Component({
  selector: 'passwords-dialog',
  templateUrl: 'passwords.dialog.html',
})
export class PasswordDialog {
}


@Component({
  selector: 'fields-dialog',
  templateUrl: 'fields.dialog.html',
})
export class FieldsDialog {
}
