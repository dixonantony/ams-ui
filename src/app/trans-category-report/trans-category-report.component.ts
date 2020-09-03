import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GlobalVariablesService } from '../global-variables.service';
import { TransactionCategoryReport, TransactionReportDataService } from '../service/data/transaction-report-data.service';
import { ExcelService } from '../service/common/excel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trans-category-report',
  templateUrl: './trans-category-report.component.html',
  styleUrls: ['./trans-category-report.component.css']
})
export class TransCategoryReportComponent implements OnInit {

  minDate     : Date;
  maxDate     : Date;
  startDate   : Date;
  endDate     : Date;
  currentDate : Date;
  transactionCategoryReport : TransactionCategoryReport[];

  displayedColumns: string[] = ['categoryName','categoryDescription','total'];
  dataSource: MatTableDataSource<TransactionCategoryReport>;

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
    this.onYearChange();
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
      this.loadTransactionCategoryReportData();
    }     
  }
  rowDoubleClick(transactionCategoryReport : TransactionCategoryReport){
    this.transactionReportDataService.categoryCode = transactionCategoryReport.categoryCode;
    this.transactionReportDataService.startDate = this.startDate;
    this.transactionReportDataService.endDate = this.endDate;
    this.router.navigateByUrl('/trans-detail-report')
  }  

  onDateChange(){
    this.loadTransactionCategoryReportData();
  }

  loadTransactionCategoryReportData(){
    this.transactionReportDataService.retrieveTransactionCategoryReportForAPeriod(this.startDate,
      this.endDate)
      .subscribe(
        data => {
        this.transactionCategoryReport = data
        this.dataSource = new MatTableDataSource<TransactionCategoryReport>(this.transactionCategoryReport);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;          
        }
      )
  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.transactionCategoryReport, 'Transaction Summary');
  }

  printReport(){
    let printContents = document.getElementById('printSection').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  goToDetails(){
    this.transactionReportDataService.categoryCode = '';
    this.transactionReportDataService.startDate = null;
    this.transactionReportDataService.endDate = null;
    this.router.navigateByUrl('/trans-detail-report')
  }

  getTotalAmount() {
    if (typeof this.transactionCategoryReport !== 'undefined' && this.transactionCategoryReport.length > 0) {
      return this.transactionCategoryReport.map(t => t.total).reduce((total, value) => total + value, 0);
    }else{
      return 0;
    }    
  }
}
