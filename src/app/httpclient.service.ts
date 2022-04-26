import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  public url:string=environment.APIUri

  constructor(private http: HttpClient,) { }

  public login(body:any){
    return this.http.post<any>(this.url+"user/login",body,{ observe: 'response' });
  }

  public register(body:any){
    return this.http.post<any>(this.url+"user/register",body,{ observe: 'response' });
  }

  public getUserByEmail(auth_token:string,email:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get<any>(this.url+`user/${email}`,{ headers: headers,observe: 'response' });
  }

  public getAvatar(avatarName:string){
    
    return this.http.get(this.url+`user/avatar/${avatarName}`,{observe: 'response',responseType: 'blob' });
  }

  public uploadAvatar(userId:string,formdata:FormData){
  console.log("fddsf");

    return this.http.put<any>(this.url+`user/upload-avatar/${userId}`,formdata,{observe: 'response' });
  }


}
