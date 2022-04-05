import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  entityForm:FormGroup;
  addInput:string;
  constructor(private dialog:MatDialog) { }

  ngOnInit() {
    this.entityForm = new FormGroup({
      addInput: new FormControl("", [Validators.required]),
    });
  }

  public addContact(){
    this.addInput=this.entityForm.get("addInput").value.trim();
    if(this.validate()==false){
      this.dialog.open(FieldsDialog)
    }else{
      alert("bien");
    }
  }
  private validate(){
    return this.entityForm.get("addInput").value.trim()!="";
  }

}

@Component({
  selector: 'fields-dialog',
  templateUrl: '../register/fields.dialog.html',
})
export class FieldsDialog {
}

