import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-selected',
  templateUrl: './not-selected.component.html',
  styleUrls: ['./not-selected.component.scss']
})
export class NotSelectedComponent implements OnInit {
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
