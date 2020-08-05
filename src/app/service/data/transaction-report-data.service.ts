import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { API_URL } from 'src/app/app.constants';

export class TransactionCategoryReport {
  constructor(public categoryCode         : string,
              public categoryName         : string, 
              public categoryDescription  : string, 
              public total                : number){

  }
}

export class TransactionSubCategoryReport {
  constructor(public transactionSubCategoryCode : string,
              public transactionSubCategoryName : string, 
              public transactionSubCategoryDesc : string, 
              public total                      : number){

  }
}

export class TransactionReport {
  constructor(public transactionId        : number,
              public transSubCategoryName : string,
              public transactionDate      : Date, 
              public amount               : number,
              public transactionDesc      : string, 
              public creditDebit          : string, 
              public transactionRefNo     : string, 
              public accountName          : string, 
              public paymentType          : string, 
              public lastUpdated          : Date, 
              public username             : string
              ){

  }
}

@Injectable({
  providedIn: 'root'
})
export class TransactionReportDataService {
  categoryCode      : string;
  subCategoryCode   : string;
  startDate;endDate : Date;
  
  constructor(private http: HttpClient,
              private datepipe: DatePipe) { }

  retrieveTransactionCategoryReportForAPeriod(startDate : Date, endDate : Date) {  
    return this.http.get<TransactionCategoryReport[]>(`${API_URL}/transactionscategoryreport/start/${this.datepipe.transform(startDate,'ddMMyyyy')}/end/${this.datepipe.transform(endDate,'ddMMyyyy')}`);
  }  
  
  retrieveTransactionSubCategoryReportForAPeriod(startDate : Date, endDate : Date) {  
    return this.http.get<TransactionSubCategoryReport[]>(`${API_URL}/transactionssubcategoryreport/start/${this.datepipe.transform(startDate,'ddMMyyyy')}/end/${this.datepipe.transform(endDate,'ddMMyyyy')}`);
  } 

  retrieveTransactionSubCategoryReportForACategory(categoryCode : string,startDate : Date, endDate : Date) {  
    return this.http.get<TransactionSubCategoryReport[]>(`${API_URL}/transactionssubcategoryreport/category/${categoryCode}/start/${this.datepipe.transform(startDate,'ddMMyyyy')}/end/${this.datepipe.transform(endDate,'ddMMyyyy')}`);
  } 

  retrieveTransactionReportForAPeriod(startDate : Date, endDate : Date) {  
    return this.http.get<TransactionReport[]>(`${API_URL}/transactionsreport/start/${this.datepipe.transform(startDate,'ddMMyyyy')}/end/${this.datepipe.transform(endDate,'ddMMyyyy')}`);
  } 

  retrieveTransactionReportForASubCategory(subCategoryCode : string,startDate : Date, endDate : Date) {  
    return this.http.get<TransactionReport[]>(`${API_URL}/transactionsreport/subcategory/${subCategoryCode}/start/${this.datepipe.transform(startDate,'ddMMyyyy')}/end/${this.datepipe.transform(endDate,'ddMMyyyy')}`);
  } 
}
