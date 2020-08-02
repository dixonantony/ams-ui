import { Component, OnInit } from '@angular/core';
import { Transaction } from '../service/data/transaction-data.service';
import { TransCategory, TransCategoryDataService, TransactionSubCategory } from '../service/data/trans-category-data.service';
import { Account,AccountDataService } from '../service/data/account-data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transaction       : Transaction;
  transCategorys    : TransCategory[];
  transSubCategorys : TransactionSubCategory[];
  transCatCode      = '';
  accounts          : Account[];

  constructor(private transCategoryDataService: TransCategoryDataService,
              private accountDataService: AccountDataService) { }

  ngOnInit(): void {
    this.transaction = new Transaction(-1,'','','','','','',0,null,null,null,'');
    this.transCategoryDataService.retrieveAllTransCategorys().subscribe(
      data => {
        this.transCategorys = data
      }
    )
    this.accountDataService.retrieveAllAccounts().subscribe(
      data => {
        this.accounts      = data
      }
    ) 
  }

  saveTransaction(){

  }

  cancelTransaction(){

  }

  onCategoryChange(){   
    this.transCategorys.forEach( transCategory => {
        if(transCategory.category_cd == this.transCatCode){
          this.transSubCategorys = transCategory.transactionSubCategory;
        }
      }
    ); 
  }

}
