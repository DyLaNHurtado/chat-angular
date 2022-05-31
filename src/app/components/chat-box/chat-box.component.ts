import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  SecurityContext,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { HttpclientService } from 'src/app/httpclient.service';
import { SocketProviderConnect } from 'src/app/web-socket.service';
import { AudioDialogComponent } from '../audio-dialog/audio-dialog.component';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  @Input() contact: any;
  @Output() isCalling = new EventEmitter();
  public textArea: string = '';
  public isEmojiPickerVisible: boolean;
  public themeDark: boolean;
  public entityForm: FormGroup;
  public input: string;
  avatar: string =
    'https://raw.githubusercontent.com/DyLaNHurtado/chat-angular/develop/src/assets/img/loading-gif.gif';
  isWritting:boolean=false;
  chatMessagesList:any[]=[];
  audioList:string[]=[];
  videosList:string[]=[];
  imagesList:string[]=[];
  userId:string;

  constructor(
    public dialog: MatDialog,
    private cookieService: CookieService,
    public httpService: HttpclientService,
    private _sanitizer: DomSanitizer,
    public socket:SocketProviderConnect,
    public viewContainerRef: ViewContainerRef,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userId=JSON.parse(this.cookieService.get('payload')).id;
    this.setTheme();
    this.entityForm = new FormGroup({
      input: new FormControl('', []),
    });
    this.getMessages();
    this.getAvatarApi();
    
    
    document.addEventListener('userSelected',(event)=>{
      event.preventDefault();
      this.contact=JSON.parse(localStorage.getItem('contact'));
      this.getMessages();
      this.getAvatarApi();
    });
      
      
      
    this.socket.on('writting',()=>{
      this.isWritting=true;
    });
    this.socket.on('notWritting',()=>{
      this.isWritting=false;
    });
    this.socket.on('newMessage',()=>{
      this.getMessages();
    });
    
  }

  private getMessages(){
        this.httpService
      .getAllMessageByChatId(JSON.parse(localStorage.getItem('chatId')))
      .subscribe(
        (res) => {
          if (res.status == 200) {
            let arr:any[]=[]
            arr.push(res.body)
            this.chatMessagesList=arr[0];
            for (let resource of this.chatMessagesList){
              if(resource.url!=undefined){
                if(resource.type=="audio"){
                  this.audioList.push(resource.url);
                }else if(resource.type=="video"){
                  this.videosList.push(resource.url);
                }else if(resource.type=="image"){
                  this.imagesList.push(resource.url);
                }
              }
            } 
            this.scrollToBottom();
          }
        },
        (errorRes: HttpErrorResponse) => {
          console.error(errorRes);
        }
      );
      
  }
  private scrollToBottom(){
    setTimeout(()=>{
      let div = document.getElementById('messages-content');
      div.scrollTop = div.scrollHeight;
    })
  }
  public base64dataToImage(base64data): void {
      this.avatar = this._sanitizer.sanitize(
        SecurityContext.RESOURCE_URL,
        this._sanitizer.bypassSecurityTrustResourceUrl(
          base64data.toString()
        )
      );
  }

  private getAvatarApi() {
    if (!this.contact.avatar.includes('https://ui-avatars.com/api/')) {
      this.httpService
        .getFile(this.contact.avatar.replace('uploads/', ''))
        .subscribe(
          (res) => {
            if (res.status == 200) {
              var reader = new FileReader();
              reader.readAsDataURL(res.body);
              reader.onload = () => {
                this.base64dataToImage(reader.result);
              };
            }
            
          },
          (errorRes: HttpErrorResponse) => {
            console.error(errorRes);
          }
        );
    } else {
      this.avatar = this.contact.avatar;
    }
    
  }

  private setTheme() {
    if (JSON.parse(localStorage.getItem('theme')) == 1) {
      this.themeDark = true;
    } else {
      this.themeDark = false;
    }
  }
  public getBg() {
    return JSON.parse(localStorage.getItem('bg'));
  }
  public getColor() {
    return JSON.parse(localStorage.getItem('bg_color'));
  }
  public addEmoji(event) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
  }

  public sendMessage() {
    this.input = this.entityForm.get('input').value;
    if (this.input.trim() != '') {

      this.httpService.postMessage({"type":"text","text":this.input.trim(),"author":this.userId,"chat":JSON.parse(localStorage.getItem('chatId')),"time":`${('0'+(new Date().getHours())).slice(-2)}:${('0'+(new Date().getMinutes())).slice(-2)}`})
      .subscribe((res)=> {
        let newMessage = res.body;
        newMessage.time=`${('0'+(new Date().getHours())).slice(-2)}:${('0'+(new Date().getMinutes())).slice(-2)}`;
        this.chatMessagesList.push(newMessage);
        this.scrollToBottom();
        this.socket.emit('messageSent',JSON.parse(localStorage.getItem('chatId')),this.userId);
        
      });
      this.entityForm.get('input').setValue('');
      this.isEmojiPickerVisible = false;
    }
  }

  public onFocus(){
    
    this.socket.emit('onInputFocus', JSON.parse(localStorage.getItem('chatId')));
  }

  public onNotFocus(){
    this.socket.emit('onInputNotFocus', JSON.parse(localStorage.getItem('chatId')));
  }

  public openImageDialog() {
    this.dialog.open(ImageDialog, {
      data: { img: this.avatar },
      panelClass:"dialog"
    });
  }

  public cleanMessages(){
    this.httpService
      .deleteChatMessages(JSON.parse(localStorage.getItem('chatId')))
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.chatMessagesList=[];
            this.scrollToBottom();
          }
        },
        (errorRes: HttpErrorResponse) => {
          console.error(errorRes);
        }
      );
  }

  public call(){
    this.isCalling.emit(true);
  }

  public openAudioDialog() {
    this.dialog.open(AudioDialogComponent,{
      disableClose:true,
      panelClass:'dialog'
    });
  }

  public openInputImageFile(){
    document.getElementById('image-input').click();
  }
  public openInputVideoFile(){
    document.getElementById('video-input').click();
  }

  onChangeImage(event:any) {
    const file = event.target.files[0];
    this.uploadImageApi(file);
    }

    onChangeVideo(event:any) {
    
      const file = event.target.files[0];
      this.uploadVideoApi(file);
      }


  private uploadImageApi(file){
    const fd = new FormData();
      fd.append('file', file, file.type);
     this.httpService.uploadImage(JSON.parse(localStorage.getItem('chatId')),JSON.parse(this.cookieService.get('payload')).id,fd)
    .subscribe(res => {
      if(res.status == 200){
        this.socket.emit('messageSent',JSON.parse(localStorage.getItem('chatId')),this.userId);
        window.location.reload();
        this.scrollToBottom();
      }
      },
      (errorRes:HttpErrorResponse) => {
        console.error(errorRes);
      });
  }

  private uploadVideoApi(file){
    const fd = new FormData();
      fd.append('file', file, file.type);
    
     this.httpService.uploadVideo(JSON.parse(localStorage.getItem('chatId')),JSON.parse(this.cookieService.get('payload')).id,fd)
    .subscribe(res => {
      if(res.status == 200){
        this.socket.emit('messageSent',JSON.parse(localStorage.getItem('chatId')),this.userId);
        window.location.reload();
        this.scrollToBottom();
      }
      },
      (errorRes:HttpErrorResponse) => {
        console.error(errorRes);
      });
  }
}

@Component({
  selector: 'image-dialog',
  templateUrl: 'image.dialog.html',
})
export class ImageDialog {
  image: string;
  ngOnInit() {
    this.image = this.data.img;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ImageDialog>
  ) {}
}

