import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { User, UserDataService } from '../service/data/user-data.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

// public user_id: number,
//               public username: string,
//               public password: string,
//               public firstName: string, 
//               public lastName: string, 
//               public email: string, 
//               public mobNo: string,               
//               public created: Date,
//               public lastUpdated: Date

export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['action','username', 'firstName', 'lastName', 'email','mobNo','created','lastUpdated'];
  users: User[];
  dataSource: MatTableDataSource<User>;

  // @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userDataService: UserDataService,
              private router : Router) { 
    
  }

  ngOnInit(): void {    
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

}
