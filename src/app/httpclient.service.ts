import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  public url:string=environment.APIUri

  constructor(private http: HttpClient) { }

  public login(body:any){
    return this.http.post<any>(this.url+"user/login",body,{ observe: 'response' });
  }
}
