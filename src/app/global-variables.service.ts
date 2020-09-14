import { Injectable } from '@angular/core';
import { FinancialYear } from './service/data/financial-year.service';
import { User } from './service/data/user-data.service';
import { Subject } from 'rxjs';

interface yesno {
  value     : string;
  viewValue : string;
}

interface commonType {
  code: string;
  Name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  currentYear   : FinancialYear
  financialYears: FinancialYear[]
  loggedInUser  : User
  enableView        : boolean = false
  enableSave        : boolean = false
  enableDelete      : boolean = false

  Active: yesno[] = [
    {value: 'Y', viewValue: 'Yes'},
    {value: 'N', viewValue: 'No'}
  ];

  paymenttypes: commonType[] = [
    {code: 'CSH', Name: 'Cash'},
    {code: 'CHQ', Name: 'Cheque'},
    {code: 'CRD', Name: 'Card'},
    {code: 'NBK', Name: 'Net Banking'}
  ];

  occupantTypes: commonType[] = [
    // {code: 'COMMON', Name: 'Common'},
    {code: 'OWNER', Name: 'Owner'},
    {code: 'TENANT', Name: 'Tenant'},
    {code: 'EMPLYE', Name: 'Employee'}
  ];

  identityTypes: commonType[] = [
    {code: 'ADHAR', Name: 'Aadhaar'},
    {code: 'PASPRT', Name: 'Passport'},
    {code: 'VOTRID', Name: 'Voters ID Card'},
    {code: 'RATCRD', Name: 'Ration Card'},    
    {code: 'PAN', Name: 'PAN Card'},
    {code: 'DRVLNSE', Name: 'Driving License'}
  ];

  relationTypes: commonType[] = [
    {code: 'WIFE', Name: 'Wife'},
    {code: 'SON', Name: 'Son'},
    {code: 'DGHTR', Name: 'Daughter'},
    {code: 'SINLW', Name: 'Son-in-law'},  
    {code: 'DINLW', Name: 'Daughter-in-law'},      
    {code: 'FTHR', Name: 'Father'},
    {code: 'MTHR', Name: 'Mother'},
    {code: 'FINLW', Name: 'Father-in-law'},
    {code: 'MINLW', Name: 'Mother-in-law'},
    {code: 'BRTHR', Name: 'Brother'},
    {code: 'SSTR', Name: 'Sister'},
    {code: 'BINLW', Name: 'Brother-in-law'},    
    {code: 'SSINLW', Name: 'Sister-in-law'},
    {code: 'GFTHR', Name: 'Grandfather'},    
    {code: 'GMTHR', Name: 'Grandmother'},
    {code: 'GGFTHR', Name: 'Great Grandfather'},    
    {code: 'GGMTHR', Name: 'Great Grandmother'},
    {code: 'NPHEW', Name: 'Nephew'},    
    {code: 'NIECE', Name: 'Niece'},
    {code: 'CUSIN', Name: 'Cousin'},
    {code: 'AUNT', Name: 'Aunt'},
    {code: 'UNCLE', Name: 'Uncle'}
  ];

  yearChangeEvent: Subject<void> = new Subject<void>();

  constructor() { }
}
