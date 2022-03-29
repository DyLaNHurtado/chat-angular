import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ProfileComponent 
} from '../profile/profile.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private router:Router) { 
  }

  ngOnInit() {
  }
  

  public goHome(){
    this.router.navigate(["../home"]);
  }
  public goProfile(){
    this.router.navigate(["../profile"]);
  }
  public goLogout(){
    this.router.navigate(["../login"]);
  }
  public goAboutUs(){
    this.router.navigate(["../aboutUs"]);
  }
}
