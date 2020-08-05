import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { AUTHENTICATION_USER } from './app.constants';
import { FinancialYear, FinancialYearService } from './service/data/financial-year.service';
import { GlobalVariablesService } from './global-variables.service';

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
  expenseMenu:  Array<any> = [
    {
      name: 'Daily Expense',
      url: '/daily-expense/-1',
      writeble: true,
      icon: 'icon-speedometer'
    }
  ];

  username = '';
  settingsMenu: Array<any> = [
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

  years: Year[] = [
    {value: 'N', viewValue: '2019'},
    {value: 'Y', viewValue: '2020'},
    {value: 'N', viewValue: '2021'}
  ];
  selectedYear : number
  financialYears: FinancialYear[]  

  constructor(public authenticationService: AuthenticationService,
              private financialYearService: FinancialYearService,
              private globalVariables: GlobalVariablesService) {
    
  }

  ngOnInit(): void {      
    let user = sessionStorage.getItem(AUTHENTICATION_USER)
    if(!(user === null)) {
      this.AfterLoggedIn(this.authenticationService.getAuthenticatedUser)
    }
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

  openForm() {
    
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
  }
}
