import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { AUTHENTICATION_USER } from './app.constants';
import { FinancialYear, FinancialYearService } from './service/data/financial-year.service';
import { GlobalVariablesService } from './global-variables.service';
import { UserDataService } from './service/data/user-data.service';

interface Year {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ams-ui';
  opened = true;
  navbarOpen = false;
  accountsMenu:  Array<any> = [
    {
      name: 'Daily Expense',
      url: '/daily-expense/-1',
      writeble: true,
      icon: 'icon-speedometer'
    }
  ];

  username  = '';
  role      = '';
  settingsMenu: Array<any> = [
    {
      name: 'Roles',
      url: '/list-roles',
      writeble: true,
      icon: 'icon-speedometer'
    },
    {
      name: 'Users',
      url: '/list-users',
      writeble: true,
      icon: 'icon-speedometer'
    },
    {
      name: 'Accounts',
      url: '/list-accounts',
      writeble: true,
      icon: 'icon-speedometer'
    },
    {
      name: 'Transaction Category',
      url: '/list-trans-category',
      writeble: true,
      icon: 'icon-speedometer'
    }
  ];
  settingsNavbarOpen = false;

  reportsMenu:  Array<any> = [
    {
      name: 'Transactions Summary',
      url: 'trans-summary-report',
      writeble: true,
      icon: 'icon-speedometer'
    },
    {
      name: 'Transactions Statement',
      url: 'transactions-report',
      writeble: true,
      icon: 'icon-speedometer'
    }
  ];
  reportsNavbarOpen = false;

  inhouseMenu:  Array<any> = [
    {
      name: 'Occupants',
      url: 'list-occupants',
      writeble: true,
      icon: 'icon-speedometer'
    }
  ];

  inhouseNavbarOpen = false;

  years: Year[] = [
    {value: 'N', viewValue: '2019'},
    {value: 'Y', viewValue: '2020'},
    {value: 'N', viewValue: '2021'}
  ];
  selectedYear : number
  financialYears: FinancialYear[]  

  constructor(public authenticationService: AuthenticationService,
              private financialYearService: FinancialYearService,
              private globalVariables: GlobalVariablesService,
              private userDataService: UserDataService,
              private cdref: ChangeDetectorRef) {          
    
  }  
  ngOnInit(): void { 
    let user = sessionStorage.getItem(AUTHENTICATION_USER)
    if(!(user === null)) {
      this.username = user
      this.AfterLoggedIn(user)
    }  
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  toggleSettingsNavbar() {    
    this.settingsNavbarOpen = !this.settingsNavbarOpen;
  }

  toggleReportsNavbar() {    
    this.reportsNavbarOpen = !this.reportsNavbarOpen;
  }

  toggleInhouseNavbar() {    
    this.inhouseNavbarOpen = !this.inhouseNavbarOpen;
  }

  openForm() {
    if(typeof this.globalVariables.loggedInUser != 'undefined'
          && this.globalVariables.loggedInUser != null){
      this.role  = this.globalVariables.loggedInUser.role.roleName;
    }
    this.username = sessionStorage.getItem(AUTHENTICATION_USER)
    document.getElementById("myForm").style.display = 'block' 
  }
 
  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  yearChange(year : number ){
    for(var finYear of this.financialYears){
      if(finYear.year == year){
        this.selectedYear = finYear.year
        this.globalVariables.currentYear = finYear
        this.ngOnInit
        this.globalVariables.yearChangeEvent.next();
      }
    }
  }

  AfterLoggedIn(username){
    this.financialYearService.retrieveAllYears()
      .subscribe(
        data => {
          this.financialYears = data
          for(var finYear of this.financialYears){
            if(finYear.currentYear == 'Y'){
              this.selectedYear = finYear.year
              this.globalVariables.currentYear = finYear
              this.globalVariables.yearChangeEvent.next();
              this.ngOnInit
            }
          }
        }
      ) 
      if(typeof this.globalVariables.loggedInUser == 'undefined'
          || this.globalVariables.loggedInUser == null){  
          this.userDataService.retriveUserByUsername(username)
            .subscribe(
              data => {
                this.globalVariables.loggedInUser = data
              }          
          );
      }
  }
}
