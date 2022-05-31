import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { HttpclientService } from 'src/app/httpclient.service';

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
  constructor(private dialogRef: MatDialogRef<AddDialogComponent>,private cookieService: CookieService,
    public httpService: HttpclientService) { }

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
      
      this.httpService.addContact({'email':this.addInput},JSON.parse(this.cookieService.get('payload')).id)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.error=false;
            this.success=true;
            document.dispatchEvent(new Event('contactAdded',{bubbles:false,cancelable:true}));
          }
        },
        (errorRes: HttpErrorResponse) => {
          console.error(errorRes);
        }
      );
      this.errorMsg="✅ User added!"
      setTimeout(()=>this.dialogRef.close(),500);
    }
  }
  private validate(){
    return this.entityForm.get("addInput").value.trim()!=""&&this.entityForm.get("addInput").value.includes('@');
  }

}


