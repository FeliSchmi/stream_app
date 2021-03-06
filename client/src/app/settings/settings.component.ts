import { Component, OnInit, Output } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  state;

  email: string; 
  constructor() { 
    this.generateStreamKey = this.generateStreamKey.bind(this);
    this.email= localStorage.getItem("email");

  }

  ngOnInit() {

    this.state = {
      stream_key : ''
    };


    this.getStreamKey();

  }

  generateStreamKey(e){
    axios.post('http://3.132.119.22:3333/settings/stream_key',{
        user: this.email
    })
        .then(res => {
            this.stateUpdate({
                stream_key : res.data.stream_key
            });
        })
  }

  getStreamKey(){
    axios.get('http://3.132.119.22:3333/settings/stream_key',{
      params: {
        user: this.email
      }
    })
        .then(res => {
            this.stateUpdate({
                stream_key : res.data.stream_key
            });
        })
  }
  stateUpdate(lv:any){
    this.state = lv;
    // console.log(`state`,this.state);

  }
 
}
