import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, SecurityContext, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import {first, map, startWith, take, takeUntil} from 'rxjs/operators';
import { HttpclientService } from 'src/app/httpclient.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  @Output() selectContact= new EventEmitter();
  @ViewChild("contact") contact:MatSelectionList;
  contactList:string[]=[]
  filteredOptions:Observable<string[]>;
  myControl:FormControl;
  themeDark:boolean;
  user:any;
  contactObjectsList=[];
  static base64data:any;
  index:number;
  avatar:string;

  constructor(public dialog: MatDialog,private cookieService:CookieService,public httpService:HttpclientService,private _sanitizer: DomSanitizer) {
    this.myControl = new FormControl();
  }

  ngOnInit() {
    
    this.setTheme();
    this.myControl = new FormControl();
    this.setContactList();
    setTimeout(()=>{
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    },700);
  }

  public base64dataToImage() : void {
    setTimeout(()=>{
      if(!ContactListComponent.base64data){
        console.log("nooo");
        this.getImageApi(this.index);
      }else{
        console.log("siiii");
        this.avatar = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,this._sanitizer.bypassSecurityTrustResourceUrl(ContactListComponent.base64data));
      }
    },1)
    
}

  private setContactList(){
    this.httpService.getFullUser(JSON.parse(this.cookieService.get('payload')).id)
      .subscribe(res => {
        if(res.status==200){
          this.user=res.body;
          this.contactList = this.user.contacts.map((user)=>{return user.name;})
          this.contactObjectsList=this.user.contacts;
          
        }
      },
        (errorRes:HttpErrorResponse) => {
          console.error(errorRes);
        });
          
    }
  
  private setTheme(){
    if(JSON.parse(localStorage.getItem('theme'))==1){
      this.themeDark=true;
    }else{
      this.themeDark=false;
    }
  }
  public getContactAvatar(name:string){
    if(name.trim()!=""){
    let position = 0;
    for (let i = 0 ;i < this.contactList.length ; i++){
      if(this.contactList[i]==name){
        position=i;
      }
    }
    this.index=position;
    return this.getImageApi(position);
  }else{
    return "";
  }
    }

    private getIndexByName(name:string){
      let position = 0;
      for (let i = 0 ;i < this.contactList.length ; i++){
        if(this.contactList[i]==name){
          position=i;
        }
    }
    return position;
  }

    private getImageApi(index){
      if(!this.contactObjectsList[index].avatar.includes("https://ui-avatars.com/api/")){
        setTimeout(()=>{
        this.httpService.getAvatar(this.contactObjectsList[index].avatar.replace("uploads/",""))
          .subscribe(res => {
           if(res.status == 200 || res.status == 304){
             var reader = new FileReader();
             reader.readAsDataURL(res.body);
                reader.onload = () => {
                  ContactListComponent.base64data = reader.result;
                  setTimeout(()=>{
                  this.base64dataToImage();
                  console.log(this.avatar);
                  
                  return this.avatar;},2000);
                }
            }else{return this.avatar;}
                
            return this.avatar;
           },
           (errorRes:HttpErrorResponse) => {
             console.error(errorRes);
           });},5000);
          }else{  
            return this.contactObjectsList[index].avatar;
          }
            
    }
    

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.contactList.filter(option => option.toLowerCase().includes(filterValue));
  }
  public sendName(){
    this.selectContact.emit(this.contactObjectsList[this.getIndexByName(this.contact.selectedOptions.selected[0].value)]);
    console.log(this.contact.selectedOptions.selected[0].value, this.contact.selectedOptions.selected[0].value);
    
  }

  public openAddDialog(){
    this.dialog.open(AddDialogComponent);
  }

}

