import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ChatAngular';
  public hide:boolean=false;
  loginOption:number=1;


  public showLogin(){
    this.loginOption=1;
  }
  public showRegister(){
    this.loginOption=0;
  }


}


