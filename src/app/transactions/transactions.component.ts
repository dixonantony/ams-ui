import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { Transaction, TransactionDataService } from '../service/data/transaction-data.service';
import { TransCategory, TransCategoryDataService, TransactionSubCategory } from '../service/data/trans-category-data.service';
import { Account,AccountDataService } from '../service/data/account-data.service';
import { GlobalVariablesService } from '../global-variables.service';
import { AuthenticationService } from '../service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionReportDataService } from '../service/data/transaction-report-data.service';

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
  minDate: Date;
  maxDate: Date;
  successMsg = '';

  constructor(private transCategoryDataService: TransCategoryDataService,
              private accountDataService: AccountDataService,
              public globalVariablesService: GlobalVariablesService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private transactionDataService: TransactionDataService,
              private transactionReportDataService: TransactionReportDataService) { 
    this.globalVariablesService.yearChangeEvent.subscribe(
      (data)=>{
        this.onYearChange()
      }
    )
  }

  ngOnInit(): void {
    this.successMsg = '';
    this.transaction = new Transaction(this.route.snapshot.params.expenseid,'','','CDT','','','',0,new Date(),null,null,
                                      this.authenticationService.getAuthenticatedUser(),'0');
            
    if(this.globalVariablesService.currentYear != null){                                 
      this.minDate = this.globalVariablesService.currentYear.startDate;
      this.maxDate = this.globalVariablesService.currentYear.endDate;
    }

    this.transCategoryDataService.retrieveAllTransCategorys().subscribe(
      data => {
        this.transCategorys = data
      }
    );

    this.transCategoryDataService.retrieveAllTransSubCategorys().subscribe(
      data => {
        this.transSubCategorys = data
      }
    );

    this.accountDataService.retrieveAllAccounts().subscribe(
      data => {
        this.accounts      = data
      }
    );

    if (this.transaction.transactionId != -1){
      this.transactionDataService.retriveTransactionById(this.transaction.transactionId)
        .subscribe(
          data => {
            this.transaction = data
          }
        )
    } 
  }

  saveTransaction(){
    if (this.transaction.transactionId == -1){
      this.transaction.transactionId = null
      this.transactionDataService.createTransaction(this.transaction)
      .subscribe(
        data => {
          // this.returnNavigate()         
          this.successMsg = 'Saved Successfully';
        }
      )
    }else{
      this.transactionDataService.updateTransaction(this.transaction)
      .subscribe(
        data => {
          if(this.transactionReportDataService.fromListTransReport == true){
            this.returnNavigate()
          }else{
            this.successMsg = 'Updated Successfully';
          }          
        }
      )
    }
  }

  cancelTransaction(){
    this.returnNavigate();
  }

  newTransaction(){  
    this.successMsg = '';
    this.transaction = new Transaction(-1,'','','CDT','','','',0,new Date(),null,null,
                                      this.authenticationService.getAuthenticatedUser(),'0');
  }

  onCategoryChange(){   
    this.transCategorys.forEach( transCategory => {
        if(transCategory.category_cd == this.transCatCode){
          this.transSubCategorys = transCategory.transactionSubCategory;
        }
      }
    ); 
  }

  onYearChange(){    
    this.minDate = this.globalVariablesService.currentYear.startDate;
    this.maxDate = this.globalVariablesService.currentYear.endDate;
  }

  returnNavigate(){
    if (this.transaction.transactionId == -1){
      this.router.navigate(['/welcome/'+ this.globalVariablesService.loggedInUser.username])
    }
    else{
      if(this.transactionReportDataService.fromListTransReport == true){
        this.router.navigateByUrl('/transactions-report')
      }else{
        this.router.navigate(['/welcome/'+ this.globalVariablesService.loggedInUser.username])
      }        
    }    
  }

  ngOnDestroy() {
    this.transactionReportDataService.fromListTransReport = false;
  }

}
