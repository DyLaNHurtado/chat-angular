import { HttpErrorResponse } from '@angular/common/http';
import { JSDocTag } from '@angular/compiler/src/output/output_ast';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, Subject } from 'rxjs';
import {
  map,
  startWith,
} from 'rxjs/operators';
import { HttpclientService } from 'src/app/httpclient.service';
import { SocketProviderConnect } from 'src/app/web-socket.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  @Output() selectContact = new EventEmitter();
  @ViewChild('contact') contact: MatSelectionList;
  contactList: string[] = [];
  filteredOptions: Observable<string[]>;
  myControl: FormControl;
  themeDark: boolean;
  user: any;
  contactObjectsList = [];

  constructor(
    public dialog: MatDialog,
    private cookieService: CookieService,
    public httpService: HttpclientService,
    public socket:SocketProviderConnect
  ) {
    this.myControl = new FormControl();
  }

  ngOnInit() {
    this.setTheme();
    this.myControl = new FormControl();
    this.setContactList();
    
    
    document.addEventListener('contactAdded',(event)=>{
      event.preventDefault();
      this.setContactList();
    });
  }


  private setContactList() {
    this.httpService
      .getFullUser(JSON.parse(this.cookieService.get('payload')).id)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.user = res.body;
            this.contactList = this.user.contacts.map((user) => {
              return user.name;
            });
            this.contactObjectsList = this.user.contacts;
            document.dispatchEvent(new Event('gotUsersCL',{bubbles:false,cancelable:true}));
          }
        },
        (errorRes: HttpErrorResponse) => {
          console.error(errorRes);
        }
      );
    document.addEventListener('gotUsersCL', (event) => {
      event.preventDefault();
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );

      let contacts = document.getElementsByClassName("contact");

      this.socket.emit('askWhoAreConnected',this.user.name);
      this.socket.on('anwserWhoAreConnected',(usersConnected) =>{
        for (const name of usersConnected) {
          Array.from(contacts).forEach((el) => {
            if(el.children[1].innerHTML==name){
              el.children[0].innerHTML="🟢";
            }
        });
        }
          Array.from(contacts).forEach((el)=>{
            if(el.children[2].children[0].innerHTML=='0'){
              el.children[2].children[0].classList.add("hide-nmessage");
            }else{
              el.children[2].children[0].classList.add("show-nmessage");
            }
      });
      });

      this.socket.on('userConnected',(id) => {
        let contacts = document.getElementsByClassName("contact");
        
        let userConnected;
        for (const e of this.contactObjectsList) {
          if(e._id==id){
            userConnected=e;
          }
        }
        if(userConnected!=undefined){
          Array.from(contacts).forEach((el) => {
            if(el.children[1].innerHTML==userConnected.name){
              el.children[0].innerHTML="🟢";
            }
        });
        }
      });

      this.socket.on('userDisconnected',(id,usersConnected) => {
        let contacts = document.getElementsByClassName("contact");
        for (const e of this.contactObjectsList) {
          if(e._id==id){
            usersConnected=e;
          }
        }
        
        Array.from(contacts).forEach((el) => {
          if(el.children[1].innerHTML==usersConnected.name){
            el.children[0].innerHTML="🔴";
          }
      });
      });
      this.socket.on('messageSentCL',(idChat,userId)=>{
        var audio = <HTMLVideoElement> document.getElementById("audio");
        audio.play();
        let contacts = document.getElementsByClassName("contact");
    
          Array.from(contacts).forEach((el)=>{
            if(el.children[1].innerHTML==this.getUsername(userId) && JSON.parse(localStorage.getItem('chatId'))!=idChat){
              el.children[2].children[0].innerHTML = (parseInt(el.children[2].children[0].innerHTML ) + 1).toString();
              if(el.children[2].children[0].innerHTML >='0'){
                el.children[2].children[0].classList.replace("hide-nmessage","show-nmessage");
              }
            }
        })
      });
    },{once:true});
  }

  private getUsername(userId:string):any{
    return this.contactObjectsList.filter(el=>el._id===userId)
    .map(el=>{return el.name})[0];
  }
  private setTheme() {
    if (JSON.parse(localStorage.getItem('theme')) == 1) {
      this.themeDark = true;
    } else {
      this.themeDark = false;
    }
  }

  public getIndexByName(name: string) {
    let position = 0;
    for (let i = 0; i < this.contactList.length; i++) {
      if (this.contactList[i] == name) {
        position = i;
      }
    }
    return position;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.contactList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
    
  }
  public sendName() {
    for (const chat of this.user.chats) {
      if(chat.members.includes(this.user._id) &&
        chat.members.includes(this.contactObjectsList[
          this.getIndexByName(this.contact.selectedOptions.selected[0].value)
        ]._id)){
          localStorage.setItem('chatId',JSON.stringify(chat._id));

          let contacts = document.getElementsByClassName("contact");
          Array.from(contacts).forEach((el)=>{
            if(el.children[1].innerHTML==this.contact.selectedOptions.selected[0].value){
              el.children[2].children[0].innerHTML="0";
              el.children[2].children[0].classList.replace("show-nmessage","hide-nmessage");
            }
          })
      }
    }
    
  
    this.selectContact.emit(
      this.contactObjectsList[this.getIndexByName(this.contact.selectedOptions.selected[0].value)]
    );
  }

  public openAddDialog() {
    this.dialog.open(AddDialogComponent,{
      panelClass:'dialog'
    });
  }
}
