import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username      = 'Username'
  password      = 'Password'
  errorMsg      = 'Invalid Credentials'
  invalidLogin  = false

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleLogin(){
    if(this.username==='admin' && this.password==='admin'){
      this.invalidLogin  = false
      console.log(this.username)
      // this.router.navigateByUrl('welcome')
      this.router.navigate(['welcome',this.username])
    }else{
      this.invalidLogin  = true
    }
  }

  usernameFocusFunction(){
    if (this.username == 'Username'){
      this.username   = null
    }      
  }

  usernameFocusOutFunction(){
    if (this.username == null){
      this.username   = 'Username'
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
