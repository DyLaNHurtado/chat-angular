import { Component, OnInit } from '@angular/core';
import { SocketProviderConnect } from 'src/app/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contact:string;
  themeDark:boolean;
  contactSeleted:boolean;
  constructor(public socket:SocketProviderConnect) { }
  
  ngOnInit() {
    this.contact= JSON.parse(localStorage.getItem('last'));
    if(this.contact=="" || this.contact==undefined){
      this.contactSeleted=false;
    }else{
      this.contactSeleted=true
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
  public selectContact(contact:any){
    this.contact=contact
    localStorage.setItem('last',JSON.stringify(this.contact));
    this.contactSeleted=true;
    document.dispatchEvent(new Event("userSelected"));
    
  }

}
