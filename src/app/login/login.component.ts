import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email     = 'Email'
  password  = 'Password'

  constructor() { }

  ngOnInit(): void {
  }

  handleLogin(){
    console.log(this.email)
  }

  emailFocusFunction(){
    if (this.email == 'Email'){
      this.email   = null
    }      
  }

  emailFocusOutFunction(){
    if (this.email == null){
      this.email   = 'Email'
    }      
  }

  pwdFocusFunction(){
    if (this.password == 'Password'){
      this.password   = null
    }      
  }

  pwdFocusOutFunction(){
    if (this.password == null){
      this.password   = 'Password'
    }      
  }

}
