import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

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

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    sessionStorage.clear()
  }

  handleLogin(){
    // if(this.authenticationService.hardCodedAuthentication(this.username,this.password)){
    //   this.invalidLogin  = false
    //   // this.router.navigateByUrl('welcome')
    //   this.router.navigate(['welcome',this.username])
    // }else{
    //   this.invalidLogin  = true
    // }
    this.handleJWTAuthLogin() 
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

  handleJWTAuthLogin() {

    this.authenticationService.executeJWTAuthenticationService(this.username,this.password).subscribe(
      data => {
        this.router.navigate(['welcome', this.username]);
        this.invalidLogin = false;
      },
      error =>{
        this.invalidLogin = true;
        if(error.error != 'INVALID_CREDENTIALS'){
          var str = error.message;
          this.errorMsg = str.substring(0,22)
          console.log(error.error)
          console.log(error.message)
        }
          
      }
    )    
  }

}
