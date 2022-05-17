import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleLoginService } from './googleLogin.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Cosmos';
  
  constructor(private loginGoogleService:GoogleLoginService, private ref: ChangeDetectorRef){

  }
  ngOnInit(): void {
    
  }
  logout(){
    this.loginGoogleService.logout();
  }
}


