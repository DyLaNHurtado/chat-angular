import { Component } from '@angular/core';
import { SocketProviderConnect } from './web-socket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ChatAngular';
  constructor(public socket:SocketProviderConnect){

  }
}


