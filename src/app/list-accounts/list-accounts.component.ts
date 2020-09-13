import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Account,AccountDataService } from '../service/data/account-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.css']
})
export class ListAccountsComponent implements OnInit {
  displayedColumns: string[] = ['action','accountCd','accountNo','accountName', 'account_bank', 'desc_txt', 'ifsc_cd','account_balance','created','active'];
  accounts: Account[];
  dataSource: MatTableDataSource<Account>;
  
  // @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private accountDataService: AccountDataService,
              private router : Router,
              private dialog: MatDialog,
              public globalVariablesService: GlobalVariablesService) { }

  ngOnInit(): void {
    this.accountDataService.retrieveAllAccounts().subscribe(
      data => {
        this.accounts      = data
        this.dataSource = new MatTableDataSource<Account>(this.accounts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ) 
  }

  editRow(account: Account){
    console.log(account)
    this.router.navigateByUrl('/account/'+ account.account_cd)
  }

  AddRow(){
    this.router.navigateByUrl('/account/na')
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRow(account: Account){    
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.accountDataService.deleteAccountById(account.account_cd).subscribe(
          data =>{
            this.accounts.splice(this.accounts.indexOf(account),1)
            this.dataSource = new MatTableDataSource<Account>(this.accounts);
          }
        )
      }      
    });
    
  }
}
