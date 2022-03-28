import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
  @Output() logged = new EventEmitter();
  public entityForm!: FormGroup;
  public inputEmail!: string;
  public inputPass!: string;

  constructor(public dialog: MatDialog,private router:Router) {
    
  }

  ngOnInit() {
    this.entityForm = new FormGroup({
      inputEmail: new FormControl("", [Validators.email,Validators.required]),
      inputPass: new FormControl("", [Validators.required])
    });
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
        this.logged.emit();
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
