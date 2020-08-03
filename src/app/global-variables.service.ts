import { Injectable } from '@angular/core';
import { FinancialYear } from './service/data/financial-year.service';
import { User } from './service/data/user-data.service';
import { Subject } from 'rxjs';

interface yesno {
  value     : string;
  viewValue : string;
}

interface paymentType {
  code: string;
  Name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  currentYear: FinancialYear
  financialYears: FinancialYear[]
  loggedInUser: User
  
  Active: yesno[] = [
    {value: 'Y', viewValue: 'Yes'},
    {value: 'N', viewValue: 'No'}
  ];

  paymenttypes: paymentType[] = [
    {code: 'CSH', Name: 'Cash'},
    {code: 'CHQ', Name: 'Cheque'},
    {code: 'CRD', Name: 'Card'},
    {code: 'NBK', Name: 'Net Banking'}
  ];

  yearChangeEvent: Subject<void> = new Subject<void>();

  constructor() { }
}
