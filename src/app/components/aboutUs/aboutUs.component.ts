import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutUs',
  templateUrl: './aboutUs.component.html',
  styleUrls: ['./aboutUs.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
