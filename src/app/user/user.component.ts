import { Component, OnInit } from '@angular/core';
import { User, UserDataService } from '../service/data/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from '../service/validation.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user : User
  confirmpassword : string;
  cnfrmPassword = true;
  parent : string;
  isDisabled = true;
  username : string;

  constructor(private route: ActivatedRoute,
    private validation: ValidationService,
    private router: Router,
    private userDataService: UserDataService
    ) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username
    if(this.username == 'nu'){
      this.username = ''
    }
    this.user = new User(-1,this.username,
                          '', '','','','',new Date(),new Date());
    this.parent = this.route.snapshot.params.parent  

    if(this.parent == 'lu'){
      this.isDisabled = false
    }else{
      this.isDisabled = true
    } 

    if (this.user.username != ''){
      this.userDataService.retriveUserByUsername(this.user.username)
        .subscribe(
          data => {
            this.user = data
            this.confirmpassword = this.user.password
          }
        )
    }                      
  }

  cnfrmPwdFocusOut(){
    console.log('cnfrmPwdFocusOut') 
    console.log(this.cnfrmPassword) 
    this.cnfrmPassword = this.validation.isInputConfirmed(this.user.password,this.confirmpassword)
    console.log(this.cnfrmPassword) 
  }
  
  saveUser(){
    if (this.user.user_id === -1){
      this.userDataService.createUser(this.user)
      .subscribe(
        data => {
          this.returnNavigate()          
        }
      )
    }else{
      console.log(this.user)
      this.userDataService.updateUser(this.user)
      .subscribe(
        data => {
          this.returnNavigate()
        }
      )

    }   
  }

  cancelUser(){
    this.returnNavigate()
  }

  returnNavigate(){
    if(this.parent == 'lu'){
      this.router.navigate(['/list-users'])
    }else{
      this.router.navigate(['welcome',this.user.username])
    }
  }

}
