import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { User, UserDataService } from '../service/data/user-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['action','username', 'fullName','role', 'email','mobNo','created','lastUpdated'];
  users: User[];
  dataSource: MatTableDataSource<User>;

  // @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userDataService: UserDataService,
              private router : Router,
              private dialog: MatDialog,
              private globalVariables: GlobalVariablesService) { 
    
  }

  ngOnInit(): void {  
    // this.users[0].occupant.fullName 
    this.userDataService.retrieveAllUsers().subscribe(
      data => {
        this.users      = data
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )    
  }

  editRow(usr: User){
    console.log(usr)
    this.router.navigateByUrl('/user/'+ usr.username+'/lu')
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  AddRow(){
    this.router.navigateByUrl('/user/nu/lu')
  }

  deleteRow(usr: User){    
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.userDataService.deleteUserById(usr.username).subscribe(
          data =>{
            this.users.splice(this.users.indexOf(usr),1)
            this.dataSource = new MatTableDataSource<User>(this.users);
          }
        )
      }      
    });
    
  }
}


