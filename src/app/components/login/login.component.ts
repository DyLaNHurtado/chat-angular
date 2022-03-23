import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

  entityForm:FormGroup;
  errorStateMatcher = new MyErrorStateMatcher();
  hide = true;
  constructor() { this.entityForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email])
  });}

  ngOnInit() {

    const matcher = new MyErrorStateMatcher();
  }

}
