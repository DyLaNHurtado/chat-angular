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
  exampleList=[1,2,'new']

  constructor(
    public dialog: MatDialog,
    private cookieService: CookieService,
    public httpService: HttpclientService,
    private _sanitizer: DomSanitizer
  ) {
    this.myControl = new FormControl();
  }

  ngOnInit() {
    this.cont=0;
    this.setTheme();
    this.myControl = new FormControl();
    this.setContactList();
  }

  public base64dataToImage(): string {
    return this._sanitizer.sanitize(
        SecurityContext.RESOURCE_URL,
        this._sanitizer.bypassSecurityTrustResourceUrl(
          ContactListComponent.base64data
        )
      );
     
  }

  public objectToJson(object){
    console.log(object);
    
    return JSON.stringify(object);

  }

  public getImageApi(avatar: string) {
    console.log("ff");
      document.addEventListener('getImageReady'+this.cont, () => {
        this.cont++;
        console.log(avatar);  
        console.log(this.filteredOptions);
          if (!avatar.includes('https://ui-avatars.com/api/')) {
          this.httpService.getAvatar(avatar.replace('uploads/', '')).subscribe(
            (res) => {
              if (res.status == 200 ) {
                console.log(200);
                
                var reader = new FileReader();
                console.log(res.body);
                
                reader.readAsDataURL(res.body);
                reader.onload = () => {
                  ContactListComponent.base64data = reader.result;
                  document.dispatchEvent(new Event('avatarReadedCL'));
                };
                document.addEventListener('avatarReadedCL', () => {
                  console.log("base64");
                  
                  this.avatar = this.base64dataToImage();
                });
              }
              this.avatar= "404";
            },
            (errorRes: HttpErrorResponse) => {
              console.error(errorRes);
            }
          );
        } else {
          console.log(avatar, "avatar de la api");
          this.avatar= avatar;
        }
       
        
      });
      if (!avatar.includes('https://ui-avatars.com/api/')) {
        this.httpService.getAvatar(avatar.replace('uploads/', '')).subscribe(
          (res) => {
            if (res.status == 200 ) {
              console.log(200);
              
              var reader = new FileReader();
              console.log(res.body);
              
              reader.readAsDataURL(res.body);
              reader.onload = () => {
                ContactListComponent.base64data = reader.result;
                document.dispatchEvent(new Event('avatarReadedCL'));
              };
              document.addEventListener('avatarReadedCL', () => {
                console.log("base64");
                
                this.avatar = this.base64dataToImage();
              });
            }
            this.avatar= "404";
          },
          (errorRes: HttpErrorResponse) => {
            console.error(errorRes);
          }
        );
      } else {
        console.log(avatar, "avatar de la api");
        return avatar;
      }
      return avatar;
        
   
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
      console.log("dd");
      document.dispatchEvent(new Event('getImageReady'+this.cont));
      console.log(this.filteredOptions);
      
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
    this.selectContact.emit(
      this.contactObjectsList[
        this.getIndexByName(this.contact.selectedOptions.selected[0].value)
      ]
    );
  }

  public openAddDialog() {
    this.dialog.open(AddDialogComponent);
  }
}
