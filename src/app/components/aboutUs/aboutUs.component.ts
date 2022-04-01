import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutUs',
  templateUrl: './aboutUs.component.html',
  styleUrls: ['./aboutUs.component.scss']
})
export class AboutUsComponent implements OnInit {
  public themeDark:boolean;
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


}
