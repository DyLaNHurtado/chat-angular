import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
  constructor() {
    this.myControl= new FormControl();
  }

  ngOnInit() {
    this.setTheme();
    this.myControl = new FormControl();
    this.contactList=["heero","hello","hola"];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }
  
  private setTheme(){
    if(JSON.parse(localStorage.getItem('theme'))==1){
      this.themeDark=true;
    }else{
      this.themeDark=false;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.contactList.filter(option => option.toLowerCase().includes(filterValue));
  }
  public sendName(){
    this.selectContact.emit(this.contact.selectedOptions.selected[0].value);
  }

}
