import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public apptheme:boolean=false
  constructor(private _snackBar: MatSnackBar,private router:Router) { }
  
  ngOnInit() {
  }
  openSnackBar() {
    this._snackBar.open("✅ Saved! ", "Ok");
    this.router.navigate(["../home"])
  }

}
