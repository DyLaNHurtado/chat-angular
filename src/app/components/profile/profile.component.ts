import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { HttpclientService } from 'src/app/httpclient.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private user:any;
  private email:string;
  error:boolean=false;
  errorMsg:string;
  public entityForm!: FormGroup;
  public edit:boolean=false;
  public avatar:string="https://material.angular.io/assets/img/examples/shiba1.jpg";
  public inputName: string;
  public inputLastName: string;
  public inputEmail: string;
  public inputStatus: string;
  public themeDark:boolean;
  constructor( private router:Router,private cookieService:CookieService,public httpService:HttpclientService) { }


  ngOnInit() {

    console.log(JSON.parse(this.cookieService.get('payload')).email);
    this.email=JSON.parse(this.cookieService.get('payload')).email
    this.httpService.getUserByEmail(this.cookieService.get('token'),this.email).subscribe(res => {
      this.user=res.body[0];
      this.setDataApiInputs();
      this.disableInputs();
    });

    this.error=false;
    this.setTheme()
    this.entityForm = new FormGroup({
      inputName: new FormControl("", [Validators.required]),
      inputLastName: new FormControl("", [Validators.required]),
      inputEmail: new FormControl("", [Validators.email,Validators.required]),
      inputStatus: new FormControl("", [Validators.required]),
    });
    
    
    
    
  }

private setDataApiInputs(){
  this.entityForm.setValue({inputName:this.user.name,
    inputLastName:this.user.lastname,
    inputEmail:this.user.email,
    inputStatus:this.user.status});
    this.avatar=this.user.avatar
}

  public uploadAvatar(){
    const inputImage = document.getElementById("image-input")[0];
    let avatar=this.avatar;
    inputImage.addEventListener('change', function(e) {
			var file = inputImage.files[0];
			var textType = /text.*/;

				var reader = new FileReader();
        
				reader.onload = function(e) {
					avatar=file;
				}

				reader.readAsText(file);	
		});
    this.avatar=avatar;
    console.log("fdsd");
    
}


  private setTheme(){
    if(JSON.parse(localStorage.getItem('theme'))==1){
      this.themeDark=true;
    }else{
      this.themeDark=false;
    }
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
  

public back(){
  this.router.navigate(["../home"])
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
      this.error=false;
    }else{
      this.error=false;
      setTimeout(()=>{this.error=true},200)
      this.errorMsg="❌ Enter all fields or check if some is incorrect"
      this.edit=!this.edit
    }
  }

  change(event:any) {
    const file =event.target.files[0];
    const fd = new FormData();
    fd.append('file', file.data)
    this.httpService.uploadAvatar(this.cookieService.get('token').toString(),JSON.parse(this.cookieService.get('payload'))._id,fd)
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
      console.log(file);
      
      this.httpService.getAvatar(this.cookieService.get('token')[1],"4fDkzPzHMgmm4Fq6znwM0xue.png")
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
  }



}
