import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

export class Account {
  constructor(public account_cd: string,
              public account_name: string,
              public account_no: string,
              public account_bank: string,
              public desc_txt: string, 
              public ifsc_cd: string, 
              public account_balance: number, 
              public active: string,               
              public created: Date){

  }
}

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {

  constructor(private http: HttpClient) { }

  retrieveAllAccounts() {
    return this.http.get<Account[]>(`${API_URL}/accounts`);
  }

  deleteAccountById(accountcd: string){
    return this.http.delete(`${API_URL}/accounts/${accountcd}`);
  }

  retriveAccountsById(accountcd: string){
    return this.http.get<Account>(`${API_URL}/accounts/${accountcd}`);
  }

  updateAccount(account: Account){
    return this.http.put(`${API_URL}/accounts`,account);
  }

  createAccount(account: Account){
    return this.http.post(`${API_URL}/accounts`,account);
  }
}
