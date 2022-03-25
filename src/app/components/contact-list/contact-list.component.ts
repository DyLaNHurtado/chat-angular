import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contactList:string[]=[]
  filteredOptions:Observable<string[]>;
  myControl:FormControl;

  constructor() {
    this.myControl= new FormControl();
  }

  ngOnInit() {
    this.myControl = new FormControl();
    this.contactList=["heero","hello","hola"];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    

}
private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.contactList.filter(option => option.toLowerCase().includes(filterValue));
}
}
