import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contact:string;
  themeDark:boolean;
  contactSeleted:boolean;
  constructor() { }

  ngOnInit() {
    if(this.contact==""){
      this.contactSeleted=false;
    }
    this.setTheme();
  }
  
  private setTheme(){
    if(JSON.parse(localStorage.getItem('theme'))==1){
      this.themeDark=true;
    }else{
      this.themeDark=false;
    }
  }
  public selectContact(contact:string){
    this.contact=contact
    this.contactSeleted=true;
  }

}
