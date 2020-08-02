import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';
import { TransactionType } from './trans-type-data.service';

export class TransactionSubCategory {
  constructor(public trans_sub_cat_cd: string,
              public trans_sub_cat_name: string,
              public trans_sub_cat_desc: string, 
              public balance: number){

  }
}

export class TransCategory {
  constructor(public category_cd: string,
              public category_name: string,
              public category_desc: string, 
              public transactionType: TransactionType, 
              public balance: number, 
              public transactionSubCategory: TransactionSubCategory[]){

  }
}

 
@Injectable({
  providedIn: 'root'
})
export class TransCategoryDataService {

  constructor(private http: HttpClient) { }

  retrieveAllTransCategorys() {
    return this.http.get<TransCategory[]>(`${API_URL}/transactioncategory`);
  }

  deleteTransCategoryById(transCategoryCd: string){
    return this.http.delete(`${API_URL}/transactioncategory/${transCategoryCd}`);
  }

  retriveTransCategoryById(transCategoryCd: string){
    return this.http.get<TransCategory>(`${API_URL}/transactioncategory/${transCategoryCd}`);
  }

  updateTransCategory(transCategory: TransCategory){
    return this.http.put(`${API_URL}/transactioncategory`,transCategory);
  }

  createTransCategory(transCategory: TransCategory){
    return this.http.post(`${API_URL}/transactioncategory`,transCategory);
  }
}
