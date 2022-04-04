import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  @Input() contact:string;
  public textArea: string = '';
  public isEmojiPickerVisible: boolean;
  public themeDark:boolean;
  public entityForm: FormGroup;
  public input: string;
  public image:string="https://material.angular.io/assets/img/examples/shiba1.jpg";
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.setTheme();
    this.entityForm = new FormGroup({
      input: new FormControl("",[]),
    });
  }
  
  private setTheme(){
    if(JSON.parse(localStorage.getItem('theme'))==1){
      this.themeDark=true;
    }else{
      this.themeDark=false;
    }
  }
  public getBg(){
    return JSON.parse(localStorage.getItem('bg'));
  }
  public addEmoji(event) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
 }
 
 public sendMessage(){
  this.input=this.entityForm.get("input").value;
  if(this.input.trim()!=""){
    alert(this.input.trim());
    this.entityForm.get("input").setValue("");

   }
  }

  public openImageDialog(){
    console.log(this.image);
    
    this.dialog.open(ImageDialog,{
      data:{img:this.image}
    });
  }
  

}


@Component({
  selector: 'image-dialog',
  templateUrl: 'image.dialog.html',
})
export class ImageDialog {
  image:string;
  ngOnInit(){
    this.image=this.data.img;
    console.log(this.data.img);
    
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    private dialogRef:MatDialogRef<ImageDialog>
  ){
  }
}
