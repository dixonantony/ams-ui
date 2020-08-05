import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';
import { DatePipe } from '@angular/common';

export class Transaction {
  constructor(public transactionId: number,
              public transactionDesc: string,
              public transSubCategoryCd: string, 
              public creditDebit: string, 
              public transactionRefNo: string, 
              public accountCd: string, 
              public paymentType: string, 
              public amount: number,
              public transactionDate: Date, 
              public created: Date,
              public lastUpdated: Date,
              public username: string){

  }
}

@Injectable({
  providedIn: 'root'
})
export class TransactionDataService {

  constructor(private http: HttpClient,
              private datepipe: DatePipe) { }

  retrieveTransactionsForAPeriod(startDate : Date, endDate : Date) {  
    return this.http.get<Transaction[]>(`${API_URL}/transactions/start/${this.datepipe.transform(startDate,'ddMMyyyy')}/end/${this.datepipe.transform(endDate,'ddMMyyyy')}`);
  }

  deleteTransactionById(transactionId: number){
    return this.http.delete(`${API_URL}/transactions/${transactionId}`);
  }

  retriveTransactionById(transactionId: number){
    return this.http.get<Transaction>(`${API_URL}/transactions/${transactionId}`);
  }

  updateTransaction(transaction: Transaction){
    return this.http.put(`${API_URL}/transactions`,transaction);
  }

  createTransaction(transaction: Transaction){
    return this.http.post(`${API_URL}/transactions`,transaction);
  }
}
