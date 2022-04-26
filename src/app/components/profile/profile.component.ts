import { HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { HttpclientService } from 'src/app/httpclient.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginComponent } from '../login/login.component';



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
  public avatar:string="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif";
  public inputName: string;
  public inputLastName: string;
  public inputEmail: string;
  public inputStatus: string;
  public themeDark:boolean;
  public static base64data:any;
  constructor( private router:Router,private cookieService:CookieService,public httpService:HttpclientService,private _sanitizer: DomSanitizer) { }


  ngOnInit() {

    console.log(JSON.parse(this.cookieService.get('payload')).email);
    this.email=JSON.parse(this.cookieService.get('payload')).email
    this.httpService.getUserByEmail(this.cookieService.get('token'),this.email).subscribe(res => {
      this.user=res.body[0];

      
      this.setDataApiInputs();
      this.getImageApi();
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
  public base64dataToImage() : void {
    setTimeout(()=>{
      if(!ProfileComponent.base64data){
        console.log("nooo");
        this.getImageApi()
      }else{
        console.log("siiii");
        console.log(this.avatar);
        
        this.avatar = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,this._sanitizer.bypassSecurityTrustResourceUrl(ProfileComponent.base64data));
        console.log(this.avatar);
      }
    },200)
    
}
private setDataApiInputs(){
  this.entityForm.setValue({inputName:this.user.name,
    inputLastName:this.user.lastname,
    inputEmail:this.user.email,
    inputStatus:this.user.status});
    //this.avatar=this.user.avatar
    
    console.log(this.avatar);
    
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
    this.uploadImageApi(file);
      
    }




    private uploadImageApi(file){
      const fd = new FormData();
      fd.append('avatar', file, file.name)
    console.log(JSON.parse(this.cookieService.get('payload')).id); 
    console.log(this.cookieService.get('token'));
    
     this.httpService.uploadAvatar(JSON.parse(this.cookieService.get('payload')).id,fd)
    .subscribe(res => {
      console.log(res.status);
      if(res.status == 200){
        this.error=false;
      }
      },
      (errorRes:HttpErrorResponse) => {
        console.log(errorRes);
        
          this.error=true;
          this.errorMsg=errorRes.error.error
      });

      
      setTimeout(()=>this.getImageApi(),100);
    }




    private getImageApi(){

         this.httpService.getUserByEmail(this.cookieService.get('token'),JSON.parse(this.cookieService.get('payload')).email)
    .subscribe(res => {
      console.log(res.status);
      if(res.status == 200){
        this.error=false;
        this.user=res.body[0];
        console.log(this.user);
        
      }
      },
      (errorRes:HttpErrorResponse) => {
        console.log(errorRes);
          this.error=true;
          this.errorMsg=errorRes.error.error
      });


setTimeout(()=>{
      this.httpService.getAvatar(this.user.avatar.replace("uploads/",""))
        .subscribe(res => {
          console.log(this.user.avatar);
          console.log(res.status);
         
         
          if(res.status == 200){
            var reader = new FileReader();
            reader.readAsDataURL(res.body);
              reader.onload = () => {
                ProfileComponent.base64data = reader.result;
                console.log(ProfileComponent.base64data.toString());
              }
              setTimeout(()=>{
                console.log(ProfileComponent.base64data.toString());
                this.base64dataToImage();
                this.error=false;
                console.log(res.body);
              },1000)
              reader.readAsText(res.body);
              
          }
          },
          (errorRes:HttpErrorResponse) => {
            console.log(errorRes);
            
              this.error=true;
              this.errorMsg=errorRes.error.error
          });
        },500)}

}
