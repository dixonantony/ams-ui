import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

export class FinancialYear {
  constructor(public year         : number,
              public startDate   : Date,
              public endDate     : Date,
              public currentYear : string, 
              public active       : string,               
              public created      : Date,
              public lastUpdated  : Date){

  }
}

@Injectable({
  providedIn: 'root'
})
export class FinancialYearService {

  constructor(private http: HttpClient) { }

  retrieveAllYears() {
    return this.http.get<FinancialYear[]>(`${API_URL}/financial_years`);
  }
}
