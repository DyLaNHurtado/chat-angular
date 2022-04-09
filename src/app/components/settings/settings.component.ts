import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit,HostBinding } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public theme:number=0;
  constructor(private _snackBar: MatSnackBar,private router:Router) { }
  public themeDark:boolean;
  
  ngOnInit() {
      this.setTheme();
      window.addEventListener("storage", this.setTheme, false);
  }

  public onSetBackground(background:string){
    localStorage.setItem('bg', JSON.stringify(background));
  }
  public onSetBgColor(bg_color:string){
    localStorage.setItem('bg_color', JSON.stringify(bg_color));
  }
  
  public onSetLightTheme(){
    localStorage.setItem('theme', JSON.stringify(0));
    window.dispatchEvent(new Event('storage'));
  }

  public onSetDarkTheme(){
    localStorage.setItem('theme', JSON.stringify(1));
    window.dispatchEvent(new Event('storage'));
  }

  public getColor(){
    return JSON.parse(localStorage.getItem('bg_color'))
  }

  private setTheme= ()=>{
    if(JSON.parse(localStorage.getItem('theme'))==1){
      this.themeDark=true;
    }else{
      this.themeDark=false;
    }
  }

  openSnackBar() {
    this._snackBar.open("✅ Saved! ", "Ok",{duration:3000});
    this.router.navigate(["../home"])
  }

}
