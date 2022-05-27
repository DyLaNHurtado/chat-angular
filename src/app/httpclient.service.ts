import { HttpClient,HttpHeaders } from '@angular/common/http';
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

  public getFile(fileName:string){
    
    return this.http.get(this.url+`user/file/${fileName}`,{observe: 'response',responseType: 'blob' });
  }

  public uploadImage(userId:string,formdata:FormData){

    return this.http.put<any>(this.url+`user/upload-image/${userId}`,formdata,{observe: 'response' });
  }

  public editProfile(body:any,idUser:string){
    return this.http.put<any>(this.url+`user/edit-profile/${idUser}`,body,{ observe: 'response' });
  }

  public editSettings(body:any,idUser:string){
    return this.http.put<any>(this.url+`user/edit-settings/${idUser}`,body,{ observe: 'response' });
  }

  public getFullUser(idUser:string){
    return this.http.get(this.url+`user/full-data/${idUser}`,{ observe: 'response' });
  }

  public addContact(body:any,userId:string){
    return this.http.put<any>(this.url+`user/add-contact/${userId}`,body,{ observe: 'response' });
  }

  public postMessage(body:any){
    return this.http.post<any>(this.url+`message`,body,{ observe: 'response' });
  }

  public getAllMessageByChatId(chatId:string){
    return this.http.get(this.url+`message/chat/${chatId}`,{ observe: 'response' });
  }

  public deleteChatMessages(chatId:string){
    return this.http.delete<any>(this.url+`chat/${chatId}`,{ observe: 'response' });
  }

  public uploadMedia(chatId:string,userId:string,formdata:FormData){
    return this.http.put<any>(this.url+`user/upload-media/${chatId}/${userId}`,formdata,{observe: 'response' });
  }
  public getLastAudio(){
    return this.http.get(this.url+`message/last/audio`,{ observe: 'response' });
  }


}
