import { Injectable, EventEmitter, Output, OnInit } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class SocketProviderConnect  extends Socket{
  @Output() outEven: EventEmitter<any> = new EventEmitter();
  constructor(private cookieService: CookieService) {
    super({
      url: environment.serverSocket,
      options: {
          query: {
              payload: cookieService.get('payload')
          }
      }
  });
  }
}
