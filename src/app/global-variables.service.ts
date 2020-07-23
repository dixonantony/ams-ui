import { Injectable } from '@angular/core';
import { FinancialYear } from './service/data/financial-year.service';
import { User } from './service/data/user-data.service';

interface yesno {
  value     : string;
  viewValue : string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  currentYear: FinancialYear
  loggedInUser: User
  
  Active: yesno[] = [
    {value: 'Y', viewValue: 'Yes'},
    {value: 'N', viewValue: 'No'}
  ];

  constructor() { }
}
