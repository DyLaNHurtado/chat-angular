import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  themeDark:boolean;
  constructor(private router:Router) { 
  }

  ngOnInit() {
    this.setTheme();
    window.addEventListener("storage", this.setTheme, false);
  }

  private setTheme(){
    if(JSON.parse(localStorage.getItem('theme'))==1){
      this.themeDark=true;
    }else{
      this.themeDark=false;
    }
  }

  public goHome(){
    this.router.navigate(["../home"]);
  }
  public goProfile(){
    this.router.navigate(["../profile"]);
  }
  public goLogout(){
    this.router.navigate(["../login"]);
    this.resetLocalStorage();
  }
  public goAboutUs(){
    this.router.navigate(["../aboutUs"]);
  }
  public goSettings(){
    this.router.navigate(["../settings"]);
  }

  private resetLocalStorage(){
    localStorage.setItem('last',JSON.stringify(""));
    localStorage.setItem('bg',JSON.stringify("background-image: url(https://raw.githubusercontent.com/DyLaNHurtado/chat-angular/b814d3e449d34f6efe09a53964e64b7b379f2aa3/src/assets/img/bg-art.svg)"));
    localStorage.setItem('bg_color',JSON.stringify("background-color: #f3efea"));
    localStorage.setItem('theme',JSON.stringify("0"));
  }
}
