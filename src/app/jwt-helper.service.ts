import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtHelperService {

constructor() { }

public isTokenValid(token: string):boolean {
  return !((Math.floor((new Date).getTime() / 1000)) >= (JSON.parse(atob(token.split('.')[1]))).exp);
}
}
