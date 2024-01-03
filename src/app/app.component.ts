import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface loginModel {
  username: string;
  password: any;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front_login_form';
  stationList: loginModel[] = [];

  travelObj: any = {
    username:'',
    password:''
  } 
  constructor( private router: Router) {

  }
  ngOnInit(): void {
  }
  

  onSearch() {
    this.router.navigate(['/search',this.travelObj.username,this.travelObj.password])
  }

  openLogin(){
    
  }
}
