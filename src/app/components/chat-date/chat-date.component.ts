import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-date',
  templateUrl: './chat-date.component.html',
  styleUrls: ['./chat-date.component.scss']
})
export class ChatDateComponent implements OnInit {
  @Input () date: string;
  constructor() { }

  ngOnInit() {
    this.setDate();
  }
  
  private setDate(){
    const now = new Date();
    let day=this.date.substring(this.date.length-2,this.date.length);
    if(day.charAt(0)=="0"){day = day.charAt(1)};
    let month=this.date.substring(this.date.length-5,this.date.length-3);
    if(month.charAt(0)=="0"){month = month.charAt(1)};
    let year=this.date.substring(0,4);
    
    if(now.getDate().toString()==day && (now.getMonth()+1).toString()==month && now.getFullYear().toString()==year ){
      this.date="Today";
    }else if((now.getDate()-1).toString() == day &&  (now.getMonth()+1).toString()==month && now.getFullYear().toString()==year){
      this.date ="Yesterday";
    }else if(month=="1"){
      this.date =`${day} January ${year}`;
    }else if(month=="2"){
      this.date =`${day} February ${year}`;
    }else if(month=="3"){
      this.date =`${day} March ${year}`;
    }else if(month=="4"){
      this.date =`${day} April ${year}`;
    }else if(month=="5"){
      this.date =`${day} May ${year}`;
    }else if(month=="6"){
      this.date =`${day} June ${year}`;
    }else if(month=="7"){
      this.date =`${day} July ${year}`;
    }else if(month=="8"){
      this.date =`${day} August ${year}`;
    }else if(month=="9"){
      this.date =`${day} September ${year}`;
    }else if(month=="10"){
      this.date =`${day} October ${year}`;
    }else if(month=="11"){
      this.date =`${day} November ${year}`;
    }else if(month=="12"){
      this.date =`${day} December ${year}`;
    }
  }

}
