import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(public dialog: MatDialog) {
    
  }

  ngOnInit() {
    this.entityForm = new FormGroup({
      inputEmail: new FormControl("", [Validators.email,Validators.required]),
      inputPass: new FormControl("", [Validators.required])
    })
    const matcher = new MyErrorStateMatcher();
  }
  
  public showRegister(){
    this.setRegister.emit();
  }
  public sendInputValues(){
    this.inputEmail=this.entityForm.get("inputEmail")!.value;
    this.inputPass=this.entityForm.get("inputPass")!.value;
    if(this.validateToSend()){
        //Api llamada 
        alert("Hola");
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
