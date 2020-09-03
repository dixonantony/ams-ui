import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalVariablesService } from '../global-variables.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TransactionReportDataService, TransactionReport } from '../service/data/transaction-report-data.service';
import { ExcelService } from '../service/common/excel.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { TransactionDataService } from '../service/data/transaction-data.service';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.css']
})
export class ListTransactionsComponent implements OnInit {
  minDate     : Date;
  maxDate     : Date;
  startDate   : Date;
  endDate     : Date;
  currentDate : Date;
  transactionReport : TransactionReport[];
  isSummaryRequired = false;

  displayedColumns: string[] = ['action','voucherNo','transSubCategoryName','transactionDate','transactionDesc','amount','paymentType', 'accountName', 'transactionRefNo'];
  dataSource: MatTableDataSource<TransactionReport>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private globalVariablesService: GlobalVariablesService,
              private transactionReportDataService: TransactionReportDataService,
              private transactionDataService: TransactionDataService,
              private excelService:ExcelService,
              private router : Router,
              private dialog: MatDialog) {
    this.currentDate  = new Date();
    this.startDate    = this.currentDate;
    this.endDate      = this.currentDate;

    this.globalVariablesService.yearChangeEvent.subscribe(
      (data)=>{
        this.onYearChange()
      }
    )
   }

  ngOnInit(): void { 
    this.isSummaryRequired = this.transactionReportDataService.isSummaryRequired
    this.onYearChange();
    this.loadTransactionData();
  }

  onYearChange(){   
    if(this.globalVariablesService.currentYear != null){                                 
      this.minDate = this.globalVariablesService.currentYear.startDate;
      if(this.currentDate > new Date(this.globalVariablesService.currentYear.endDate)){
        this.maxDate = this.globalVariablesService.currentYear.endDate;
      }
      else{
        this.maxDate = this.currentDate;
      }
      this.startDate = this.minDate;
      this.endDate   = this.maxDate;
    } 
    this.loadTransactionData();    
  }

  onDateChange(){
    this.loadTransactionData();
  }

  loadTransactionData(){
    if( this.transactionReportDataService == null ||       
      typeof this.transactionReportDataService.subCategoryCode === 'undefined' ||
      this.transactionReportDataService.subCategoryCode == '' ) {
    this.transactionReportDataService.retrieveTransactionReportForAPeriod(this.startDate,
      this.endDate)
      .subscribe(
        data => {
        this.transactionReport = data
        this.dataSource = new MatTableDataSource<TransactionReport>(this.transactionReport);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;          
        }
      )
  } 
  else{
    this.startDate = this.transactionReportDataService.startDate;
    this.endDate   = this.transactionReportDataService.endDate;
    this.transactionReportDataService.retrieveTransactionReportForASubCategory(
              this.transactionReportDataService.subCategoryCode,this.startDate,this.endDate)
      .subscribe(
        data => {        
        this.transactionReportDataService.startDate = this.globalVariablesService.currentYear.startDate;
        this.transactionReportDataService.endDate = this.globalVariablesService.currentYear.endDate;
        this.transactionReport = data
        this.dataSource = new MatTableDataSource<TransactionReport>(this.transactionReport);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;          
        }
      )
  } 
  }
  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.transactionReport, 'Transaction');
  }

  printReport(){
    let printContents = document.getElementById('printSection').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  rowDoubleClick(transactionReport : TransactionReport){
    this.editRow(transactionReport);
  } 

  returnBack(){
    this.router.navigateByUrl('/trans-detail-report')
  }
  ngOnDestroy() {
    this.transactionReportDataService.subCategoryCode  = ''
    this.transactionReportDataService.isSummaryRequired = false;
  }

  editRow(transactionReport : TransactionReport){
    this.transactionReportDataService.fromListTransReport = true;
    this.router.navigateByUrl('/daily-expense/'+transactionReport.transactionId)
  }

  AddRow(){
    this.router.navigateByUrl('/account/na')
  }

  deleteRow(transactionReport : TransactionReport){    
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console
      if(result){
        this.transactionDataService.deleteTransactionById(transactionReport.transactionId).subscribe(
          data =>{
            this.transactionReport.splice(this.transactionReport.indexOf(transactionReport),1)
            this.dataSource = new MatTableDataSource<TransactionReport>(this.transactionReport);
          }
        )
      }      
    });
    
  }
}
