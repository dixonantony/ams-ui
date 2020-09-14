import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { GlobalVariablesService } from '../global-variables.service';
import { Occupant, OccupantDataService } from '../service/data/occupant-data.service';

@Component({
  selector: 'app-list-occupants',
  templateUrl: './list-occupants.component.html',
  styleUrls: ['./list-occupants.component.css']
})
export class ListOccupantsComponent implements OnInit {
  displayedColumns: string[] = ['action','occupantcyType','fullName','appartment', 'email','mobNo','whatsappEnabled','fromDate','toDate'];
  occupants: Occupant[];
  dataSource: MatTableDataSource<Occupant>;
  selectedOccupantcyType : string;

  // @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private occupantDataService: OccupantDataService,
              private router : Router,
              private dialog: MatDialog,
              public globalVariablesService: GlobalVariablesService) { }

  ngOnInit(): void {
    this.occupantDataService.retrieveAllOccupants().subscribe(
      data => {
        this.occupants            = data
        this.occupants = this.occupants.filter(obj => obj.occupantcyType !== 'COMMON');
        this.dataSource           = new MatTableDataSource<Occupant>(this.occupants);
        this.dataSource.sort      = this.sort;
        this.dataSource.paginator = this.paginator;
        
      }
    )    
  }

  editRow(occupant: Occupant){
    this.router.navigateByUrl('/occupant/'+ occupant.occupantId)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  AddRow(){
    this.router.navigateByUrl('/occupant/-1')
  }

  deleteRow(occupant: Occupant){    
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result){
        this.occupantDataService.deleteOccupantById(occupant.occupantId).subscribe(
          data =>{
            this.occupants.splice(this.occupants.indexOf(occupant),1)
            this.dataSource = new MatTableDataSource<Occupant>(this.occupants);
          }
        )
      }      
    });    
  }

  onOccupantcyTypeChange(){
    this.occupantDataService.retriveOccupantsByType(this.selectedOccupantcyType).subscribe(
      data => {
        this.occupants            = data
        this.occupants = this.occupants.filter(obj => obj.occupantcyType !== 'COMMON');
        this.dataSource           = new MatTableDataSource<Occupant>(this.occupants);
        this.dataSource.sort      = this.sort;
        this.dataSource.paginator = this.paginator;
        
      }
    )
  }

}
