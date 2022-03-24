import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contactList:string[]=[]
  filteredOptions:string[]=[]

  constructor() {}

  ngOnInit() {
    this.contactList=["1","2","3"]
    this.filteredOptions=["1","2","3","4","5"];
  }

}
