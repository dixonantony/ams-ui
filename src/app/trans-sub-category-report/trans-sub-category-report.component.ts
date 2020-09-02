import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GlobalVariablesService } from '../global-variables.service';
import { TransactionReportDataService, TransactionSubCategoryReport } from '../service/data/transaction-report-data.service';
import { Router } from '@angular/router';
import { ExcelService } from '../service/common/excel.service';

@Component({
  selector: 'app-trans-sub-category-report',
  templateUrl: './trans-sub-category-report.component.html',
  styleUrls: ['./trans-sub-category-report.component.css']
})
export class TransSubCategoryReportComponent implements OnInit {

  minDate     : Date;
  maxDate     : Date;
  startDate   : Date;
  endDate     : Date;
  currentDate : Date;
  transactionSubCategoryReport : TransactionSubCategoryReport[];
  
  displayedColumns: string[] = ['subCategoryName','subCategoryDescription','total'];
  dataSource: MatTableDataSource<TransactionSubCategoryReport>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private globalVariablesService: GlobalVariablesService,
              private transactionReportDataService: TransactionReportDataService,
              private excelService:ExcelService,
              private router : Router) {
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
    this.onYearChange() 
    this.loadTransactionSubCategoryReportData();
  }

  loadTransactionSubCategoryReportData(){
    console.log('start'+this.startDate)
    console.log('endDate'+this.startDate)
    if( this.transactionReportDataService == null ||       
        typeof this.transactionReportDataService.categoryCode === 'undefined' ||
        this.transactionReportDataService.categoryCode == '' ) {
      this.transactionReportDataService.retrieveTransactionSubCategoryReportForAPeriod(this.startDate,
        this.endDate)
        .subscribe(
          data => {
          this.transactionSubCategoryReport = data
          console.log(this.transactionSubCategoryReport)
          this.dataSource = new MatTableDataSource<TransactionSubCategoryReport>(this.transactionSubCategoryReport);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;          
          }
        )
    } 
    else{
      this.startDate = this.transactionReportDataService.startDate;
      this.endDate   = this.transactionReportDataService.endDate;
      this.transactionReportDataService.retrieveTransactionSubCategoryReportForACategory(
                this.transactionReportDataService.categoryCode,this.startDate,this.endDate)
        .subscribe(
          data => {
          this.transactionReportDataService.categoryCode  = ''
          this.transactionReportDataService.startDate = this.globalVariablesService.currentYear.startDate;
          this.transactionReportDataService.endDate = this.globalVariablesService.currentYear.endDate;
          this.transactionSubCategoryReport = data
          this.dataSource = new MatTableDataSource<TransactionSubCategoryReport>(this.transactionSubCategoryReport);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;          
          }
        )
    } 
    
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
    this.loadTransactionSubCategoryReportData();  
  }

  onDateChange(){
    this.loadTransactionSubCategoryReportData();
  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.transactionSubCategoryReport, 'Transaction Details');
  }

  printReport(){
    let printContents = document.getElementById('printSection').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  rowDoubleClick(transactionSubCategoryReport : TransactionSubCategoryReport){
    this.transactionReportDataService.subCategoryCode = transactionSubCategoryReport.transactionSubCategoryCode;
    this.transactionReportDataService.startDate = this.startDate;
    this.transactionReportDataService.endDate = this.endDate;
    this.router.navigateByUrl('/transactions-report')
  } 

  returnBack(){
    this.router.navigateByUrl('/trans-summary-report')
  }
  goToDetails(){
    this.transactionReportDataService.subCategoryCode = '';
    this.transactionReportDataService.isSummaryRequired = true;
    this.transactionReportDataService.startDate = null;
    this.transactionReportDataService.endDate = null;
    this.router.navigateByUrl('/transactions-report')    
  }  
}
