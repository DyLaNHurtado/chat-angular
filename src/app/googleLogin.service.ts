import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleLoginService {
private auth2:gapi.auth2.GoogleAuth;
private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);
constructor() { 
  gapi.load('auth2',()=>{
    gapi.auth2.init({
      client_id: '1012840483456-71vm5h0c2js5g9oianvl35ub18u99ds8.apps.googleusercontent.com'
    })
  })
}

public login(){
  this.auth2.signIn({
    scope:'https://www.googleapis.com/auth/gmail.readonly'
  }).then( user=>{
    this.subject.next(user);
  }).catch(()=>{
    this.subject.next(null);
  });
}
public logout(){
  this.auth2.signOut().then( ()=>{
    this.subject.next(null);
  });
}

public observable():Observable<gapi.auth2.GoogleUser>{
  return this.subject.asObservable();
}

}
