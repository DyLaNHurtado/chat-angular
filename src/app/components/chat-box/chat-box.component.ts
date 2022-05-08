import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  Inject,
  Input,
  OnInit,
  SecurityContext,
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

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  @Input() contact: any;
  public textArea: string = '';
  public isEmojiPickerVisible: boolean;
  public themeDark: boolean;
  public entityForm: FormGroup;
  public input: string;
  static base64data: any;
  avatar: string =
    'https://raw.githubusercontent.com/DyLaNHurtado/chat-angular/develop/src/assets/img/loading-gif.gif';
  isWritting:boolean=false;
  constructor(
    public dialog: MatDialog,
    private cookieService: CookieService,
    public httpService: HttpclientService,
    private _sanitizer: DomSanitizer,
    public socket:SocketProviderConnect
  ) {}

  ngOnInit() {
    this.setTheme();
    this.entityForm = new FormGroup({
      input: new FormControl('', []),
    });
    this.getImageApi();
    document.addEventListener('userSelected',()=>{
      console.log("gsf");
      this.contact=JSON.parse(localStorage.getItem('contact'));
      this.getImageApi();
    });
    this.socket.on('writting',()=>{
      console.log("writting");
      
      this.isWritting=true;
    });
    this.socket.on('notWritting',()=>{
      console.log("nowritting");
      this.isWritting=false;
    })
    
  }

  public base64dataToImage(): void {
    if (!ChatBoxComponent.base64data) {
      console.log('nooo');
      this.getImageApi();
    } else {
      console.log('siiii');

      this.avatar = this._sanitizer.sanitize(
        SecurityContext.RESOURCE_URL,
        this._sanitizer.bypassSecurityTrustResourceUrl(
          ChatBoxComponent.base64data
        )
      );
    }
  }

  private getImageApi() {
    if (!this.contact.avatar.includes('https://ui-avatars.com/api/')) {
      this.httpService
        .getAvatar(this.contact.avatar.replace('uploads/', ''))
        .subscribe(
          (res) => {
            if (res.status == 200) {
              var reader = new FileReader();
              reader.readAsDataURL(res.body);
              reader.onload = () => {
                ChatBoxComponent.base64data = reader.result;
                document.dispatchEvent(new Event('avatarReadedChatBox'));
              };
              document.addEventListener('avatarReadedChatBox', () => {
                this.base64dataToImage();
                console.log(res.body);
              });
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
      alert(this.input.trim());
      this.entityForm.get('input').setValue('');
      this.isEmojiPickerVisible = false;
    }
  }

  public onFocus(){
    console.log(localStorage.getItem('chatId'));
    
    this.socket.emit('onInputFocus', JSON.parse(localStorage.getItem('chatId')));
  }

  public onNotFocus(){
    this.socket.emit('onInputNotFocus', JSON.parse(localStorage.getItem('chatId')));
  }

  public openImageDialog() {
    console.log(this.avatar);

    this.dialog.open(ImageDialog, {
      data: { img: this.avatar },
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
    console.log(this.data.img);
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ImageDialog>
  ) {}
}
