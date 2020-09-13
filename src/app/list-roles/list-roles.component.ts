import { Component, OnInit, ViewChild } from '@angular/core';
import { Role, RoleDataService } from '../service/data/role-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit {
  displayedColumns: string[] = ['action','roleName', 'roleDescription'];
  roles: Role[];
  dataSource: MatTableDataSource<Role>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private roleDataService: RoleDataService,
              private router : Router,
              private dialog: MatDialog,
              public globalVariablesService: GlobalVariablesService) { }

  ngOnInit(): void {
    this.roleDataService.retrieveAllRoles().subscribe(
      data => {
        this.roles      = data
        this.dataSource = new MatTableDataSource<Role>(this.roles);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )  
  }

  editRow(role: Role){
    this.router.navigateByUrl('/role/'+ role.roleCode)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  AddRow(){
    this.router.navigateByUrl('/role/nr')
  }

  deleteRow(role: Role){    
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.roleDataService.deleteRoleById(role.roleCode).subscribe(
          data =>{
            this.roles.splice(this.roles.indexOf(role),1)
            this.dataSource = new MatTableDataSource<Role>(this.roles);
          }
        )
      }      
    });
    
  }

}
