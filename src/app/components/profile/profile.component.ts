import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router} from "@angular/router";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public entityForm!: FormGroup;
  public edit:boolean=false;
  public image:string="https://material.angular.io/assets/img/examples/shiba1.jpg";
  public inputName: string;
  public inputLastName: string;
  public inputEmail: string;
  public inputStatus: string;
  constructor( private router:Router,public dialog: MatDialog) { }


  ngOnInit() {
    this.entityForm = new FormGroup({
      inputName: new FormControl("", [Validators.required]),
      inputLastName: new FormControl("", [Validators.required]),
      inputEmail: new FormControl("", [Validators.email,Validators.required]),
      inputStatus: new FormControl("", [Validators.required]),
    });
    this.disableInputs();
  }

  private validateToSend():boolean{
    this.inputName=this.entityForm.get('inputName').value;
    this.inputLastName=this.entityForm.get('inputLastName').value;
    this.inputEmail=this.entityForm.get('inputEmail').value;
    this.inputStatus=this.entityForm.get('inputStatus').value;
    if(this.inputName.trim()!=""&&
    this.inputLastName.trim()!=""&&
    this.inputStatus.trim()!=""&&
    this.inputEmail.trim()!=""&&this.inputEmail.includes("@")){
      return true
    }
    return false;
  }
  


  public onEditFields(){
    if(!this.edit){
      this.edit=!this.edit;
      this.enableInputs();
    }else{
      this.edit=!this.edit;
      this.disableInputs();
    }
  }

  public enableInputs(){
    this.entityForm.get("inputName").enable();
    this.entityForm.get("inputLastName").enable();
    this.entityForm.get("inputEmail").enable();
    this.entityForm.get("inputStatus").enable();
  }

  public disableInputs(){
    if(this.validateToSend()){
      this.entityForm.get("inputName").disable();
      this.entityForm.get("inputLastName").disable();
      this.entityForm.get("inputEmail").disable();
      this.entityForm.get("inputStatus").disable();
    }else{
      this.dialog.open(FieldsDialog);
      this.edit=!this.edit
    }
  }

  change(event:any) {
    console.log(event.target.files);
    }



}
@Component({
  selector: 'fields-dialog',
  templateUrl: '../register/fields.dialog.html',
})
export class FieldsDialog {
}
