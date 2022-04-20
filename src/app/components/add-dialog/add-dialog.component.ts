import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  error:boolean=false;
  success:boolean=false;
  errorMsg:string;
  entityForm:FormGroup;
  addInput:string;
  constructor(private dialogRef: MatDialogRef<AddDialogComponent>) { }

  ngOnInit() {
    this.error=false;
    this.success=false;
    this.entityForm = new FormGroup({
      addInput: new FormControl("", [Validators.required]),
    });
  }

  public addContact(){
    this.addInput=this.entityForm.get("addInput").value.trim();
    if(this.validate()==false){
      this.error=false;
      setTimeout(()=>{this.error=true},200);
      this.success=false;
      this.errorMsg="❌ This is not an email"
    }else{
      this.error=false;
      this.success=true;
      alert("bien");
      this.errorMsg="✅ User added!"
      setTimeout(()=>this.dialogRef.close(),500);
    }
  }
  private validate(){
    return this.entityForm.get("addInput").value.trim()!="";
  }

}


