import { Component, OnInit, ViewChild } from '@angular/core';
import { TransCategory, TransCategoryDataService } from '../service/data/trans-category-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-list-trans-category',
  templateUrl: './list-trans-category.component.html',
  styleUrls: ['./list-trans-category.component.css']
})
export class ListTransCategoryComponent implements OnInit {
  displayedColumns: string[] = ['action','transCategoryCd','transCategoryName','transCategoryDesc', 'transactionType', 'transBalance'];
  transCategorys: TransCategory[];
  dataSource: MatTableDataSource<TransCategory>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private transCategoryDataService: TransCategoryDataService,
              private router : Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.transCategoryDataService.retrieveAllTransCategorys().subscribe(
      data => {
        // console.log(data)
        this.transCategorys = data
        this.dataSource = new MatTableDataSource<TransCategory>(this.transCategorys);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  editRow(transCategory: TransCategory){
    console.log(transCategory)
    this.router.navigateByUrl('/trans-category/'+ transCategory.category_cd)
  }

  AddRow(){
    this.router.navigateByUrl('/trans-category/na')
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRow(transCategory: TransCategory){    
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.transCategoryDataService.deleteTransCategoryById(transCategory.category_cd).subscribe(
          data =>{
            this.transCategorys.splice(this.transCategorys.indexOf(transCategory),1)
            this.dataSource = new MatTableDataSource<TransCategory>(this.transCategorys);
          }
        )
      }      
    });
    
  }

}
