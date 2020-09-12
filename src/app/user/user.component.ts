import { Component, OnInit } from '@angular/core';
import { User, UserDataService } from '../service/data/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from '../service/validation.service';
import { Occupant, OccupantDataService } from '../service/data/occupant-data.service';
import { RoleDataService, Role } from '../service/data/role-data.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user            : User
  confirmpassword : string;
  cnfrmPassword   = true;
  parent          : string;
  isDisabled      = true;
  username        : string;
  occupants       : Occupant[]
  occupantId      : number
  roles           : Role[]
  roleCode        : string

  constructor(private route: ActivatedRoute,
    private validation: ValidationService,
    private router: Router,
    private userDataService: UserDataService,
    private occupantDataService: OccupantDataService,
    private roleDataService: RoleDataService  
    ) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username
    if(this.username == 'nu'){
      this.username = ''
    }
    this.user = new User(-1,this.username,'', '','','','',new Date(),new Date(),
                        new Occupant(-1,'',new Date(),new Date(),'', '','','','','', '','',null,null),
                        new Role('', '','',null));
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
            this.user             = data
            this.confirmpassword  = this.user.password
            this.occupantId       = this.user.occupant.occupantId
            this.roleCode         = this.user.role.roleCode
          }
        )
    }
    
    this.occupantDataService.retrieveAllOccupants().subscribe(
      data => {
        this.occupants = data
      }
    );

    this.roleDataService.retrieveAllRoles().subscribe(
      data => {
        this.roles = data
      }
    );
  }

  cnfrmPwdFocusOut(){
    this.cnfrmPassword = this.validation.isInputConfirmed(this.user.password,this.confirmpassword)
    
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

  onOccupantChange(){
    var occ = this.occupants.filter(occ => occ.occupantId == this.occupantId)[0]
    this.user.occupant = occ; 
  }

  onRoleChange(){   
    var rol = this.roles.filter(rol => rol.roleCode == this.roleCode)[0]
    this.user.role = rol;
  }

}
