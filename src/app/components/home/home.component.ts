import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  themeDark:boolean;
  constructor() { }

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

}
