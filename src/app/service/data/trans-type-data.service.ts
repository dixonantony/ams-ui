import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { HttpClient } from '@angular/common/http';

export class TransactionType {
  constructor(public transaction_type_cd: string,
              public transaction_type: string){

  }
}

@Injectable({
  providedIn: 'root'
})
export class TransTypeDataService {

  constructor(private http: HttpClient) { }

  retrieveAllTransactionTypes() {
    return this.http.get<TransactionType[]>(`${API_URL}/transactiontypes`);
  }

  retriveTransactionTypeById(transactionTypeCd: string){
    return this.http.get<TransactionType>(`${API_URL}/transactiontypes/${transactionTypeCd}`);
  }
}
