import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountDataService, Account } from '../service/data/account-data.service';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  account : Account  
  accountcd : string;
  isUpdated = false;
  active;

  constructor(private route: ActivatedRoute,
              private accountDataService: AccountDataService,
              private router: Router,
              private globalVarService:GlobalVariablesService) { }

  ngOnInit(): void {    
    this.accountcd  = this.route.snapshot.params.accountcd
    this.active     = this.globalVarService.Active
    if(this.accountcd == 'na'){
      this.accountcd = ''      
    }
    else{
      this.isUpdated = true
    }
    this.account = new Account(this.accountcd,'','',
                          '', '','',0,'N',new Date());

    if (this.accountcd != ''){
      this.accountDataService.retriveAccountsById(this.accountcd)
        .subscribe(
          data => {
            this.account = data
          }
        )
    }  
    console.log('account'+this.account.account_cd)             
  }

  saveAccount(){
    if (!this.isUpdated){
      this.accountDataService.createAccount(this.account)
      .subscribe(
        data => {
          this.returnNavigate()          
        }
      )
    }else{
      this.accountDataService.updateAccount(this.account)
      .subscribe(
        data => {
          this.returnNavigate()
        }
      )

    }   
  }

  cancelAccount(){
    this.returnNavigate()
  }

  returnNavigate(){
    this.router.navigate(['/list-accounts'])
  }

}
