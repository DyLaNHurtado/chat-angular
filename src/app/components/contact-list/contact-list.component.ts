import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SecurityContext,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, Subject } from 'rxjs';
import {
  concatMap,
  delay,
  first,
  map,
  startWith,
  take,
  takeUntil,
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
  static base64data: any;
  index: number;
  avatar: string;
  avatarList: string[] = [];
  cont=0;

  constructor(
    public dialog: MatDialog,
    private cookieService: CookieService,
    public httpService: HttpclientService,
    private _sanitizer: DomSanitizer,
    public socket:SocketProviderConnect
  ) {
    this.myControl = new FormControl();
  }

  ngOnInit() {
    this.setTheme();
    this.myControl = new FormControl();
    this.setContactList();
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
            this.avatarList = this.user.contacts.map(
              (contact) => contact.avatar
            );
            console.log(this.avatarList);

            document.dispatchEvent(new Event('gotUsersCL'));
          }
        },
        (errorRes: HttpErrorResponse) => {
          console.error(errorRes);
        }
      );
    document.addEventListener('gotUsersCL', () => {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
      
    });
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
    console.log(this.user);
    console.log(this.user.chats);
    console.log(this.contactObjectsList[
      this.getIndexByName(this.contact.selectedOptions.selected[0].value)
    ]._id);
    console.log(this.user._id);
    
    let chatId;
    for (const chat of this.user.chats) {
      if(chat.members.includes(this.user._id) &&
        chat.members.includes(this.contactObjectsList[
          this.getIndexByName(this.contact.selectedOptions.selected[0].value)
        ]._id)){
        chatId = chat._id;
        this.socket.sendChatSelected(chatId);
      }
    }
    localStorage.setItem('chatId',JSON.stringify(chatId));
    this.selectContact.emit(
      this.contactObjectsList[this.getIndexByName(this.contact.selectedOptions.selected[0].value)]
    );
  }

  public openAddDialog() {
    this.dialog.open(AddDialogComponent);
  }
}
