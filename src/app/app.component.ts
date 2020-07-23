import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';
import { AUTHENTICATION_USER } from './app.constants';
import { FinancialYear, FinancialYearService } from './service/data/financial-year.service';
import { GlobalVariablesService } from './global-variables.service';

export const menuJSON= [
  {
    name: 'Dashboard',
    url: '/login',
    writeble: true,
    icon: 'icon-speedometer'
  },
  {
    name: 'Menu1',
    url: '/logout',
    writeble: true,
    icon: 'icon-puzzle'
  }
]

interface Year {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ams-ui';
  opened = true;
  navbarOpen = false;
  menus: Array<any> = menuJSON;
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
      url: '/list-trans-cat',
      writeble: true,
      icon: 'icon-speedometer'
    }
  ]
  settingsNavbarOpen = false;

  years: Year[] = [
    {value: 'N', viewValue: '2019'},
    {value: 'Y', viewValue: '2020'},
    {value: 'N', viewValue: '2021'}
  ];
  selectedYear : number
  financialYears: FinancialYear[]

  constructor(private router: Router,
              public authenticationService: AuthenticationService,
              private financialYearService: FinancialYearService,
              private globalVariables: GlobalVariablesService) {

    this.financialYearService.retrieveAllYears()
      .subscribe(
        data => {
          this.financialYears = data
          for(var finYear of this.financialYears){
            if(finYear.currentYear == 'Y'){
              this.selectedYear = finYear.year
              globalVariables.currentYear = finYear
            }
          }
        }
      ) 
  }

 
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  toggleSettingsNavbar() {
    
    this.settingsNavbarOpen = !this.settingsNavbarOpen;
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
      }
    }
  }
}
