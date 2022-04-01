import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  themeDark:boolean;
  constructor(private router:Router) { }
  ngOnInit() {
    this.setTheme();
  }
  private setTheme(){
    if(JSON.parse(localStorage.getItem('theme'))==1){
      this.themeDark=true;
    }else{
      this.themeDark=false;
    }
  }
  public goHome(){
    this.router.navigate(["../home"])
  }
}
