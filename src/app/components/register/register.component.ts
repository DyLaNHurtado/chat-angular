import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide:boolean=true;
  
  @Output() setLogin=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  public showLogin(){
    this.setLogin.emit()
  }

}
