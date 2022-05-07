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
  console.log(cookieService.get("payload"));
  

  

  /**
   * ---------------- ESCUCHAMOS----------------
   * En este punto nuestro socket.io-client esta listo para recibir los eventos.
   * 
   * En esta funcion vemos como esta preparado para recibir un evento llamado "message" el cual
   * una vez sea recibido va a emitir por nuestro "outEven"
   */
  }


     /**
     * ---------------- EMITIR-------------------
     * Ahora solo nos falta poder emitir mensajes, para ello declaramos la funcion
     * "emitEvent" la cual va ser disparada por un "(click)" la cual emite un evento
     * con el nombre "default", y un payload de información el cual sera parseado 
     * por nuestro backend.
     */


}
