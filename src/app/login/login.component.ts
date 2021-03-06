import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { GlobalVariablesService } from '../global-variables.service';
import { UserDataService } from '../service/data/user-data.service';

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
  
  @Output() IsLoggedIn = new EventEmitter<String>();

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private globalVariables: GlobalVariablesService,
              private userDataService: UserDataService) { }

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
        this.IsLoggedIn.emit(this.username);
        this.router.navigate(['welcome', this.username]);
        this.invalidLogin = false;
        this.userDataService.retriveUserByUsername(this.username)
            .subscribe(
              data => {
                this.globalVariables.loggedInUser = data
                console.log('username '+ this.username)
              }          
          );
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

  getEmitter() {
    return this.IsLoggedIn;
  }


}
