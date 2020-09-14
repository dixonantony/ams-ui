import { Component, OnInit, ViewChild } from '@angular/core';
import { TransCategory, TransCategoryDataService, TransactionSubCategory } from '../service/data/trans-category-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionType, TransTypeDataService } from '../service/data/trans-type-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-trans-category',
  templateUrl: './trans-category.component.html',
  styleUrls: ['./trans-category.component.css']
})
export class TransCategoryComponent implements OnInit {
  transCategory       : TransCategory
  category_cd         : string;
  isUpdated           = false; 
  transactionTypes    :TransactionType[]
  subCategoryCd       : string;
  tmpTSCName          : string;
  tmpTSCDesc          : string;
  rowAction           : string;
  rowRequired         = false; 
  addFirstRow         = false;
  editedRow           = -1
  rowValidationMsg    : string;

  displayedColumns: string[] = ['action','transSubCategoryCd','transSubCategoryName','transSubCategoryDesc', 'transSubBalance'];
  dataSource: MatTableDataSource<TransactionSubCategory>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private transCategoryDataService: TransCategoryDataService,
              private transTypeDataService: TransTypeDataService,
              public globalVariablesService: GlobalVariablesService) { }

  ngOnInit(): void {
    this.transTypeDataService.retrieveAllTransactionTypes().subscribe(
      data =>{
        this.transactionTypes = data
      }
    )

    this.category_cd  = this.route.snapshot.params.transCategoryCd
    if(this.category_cd == 'na'){
      this.category_cd = ''  
      this.addFirstRow = true;    
    }
    else{
      this.isUpdated = true
    }
    this.transCategory = new TransCategory(this.category_cd,'','',new TransactionType('',''), 0,[new TransactionSubCategory('','','',0)]);
    

    if (this.category_cd != ''){
      this.transCategoryDataService.retriveTransCategoryById(this.category_cd)
        .subscribe(
          data => {
            this.transCategory = data
            this.dataSource = new MatTableDataSource<TransactionSubCategory>(this.transCategory.transactionSubCategory);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;          
          }
        )
    } 
  }

  saveCategory(){
    if(!this.rowRequired && this.editedRow === -1){
      console.log(this.isUpdated)
      if (!this.isUpdated){
        this.transCategoryDataService.createTransCategory(this.transCategory)
        .subscribe(
          data => {
            this.returnNavigate()          
          }
        )
      }else{
        this.transCategoryDataService.updateTransCategory(this.transCategory)
        .subscribe(
          data => {
            this.returnNavigate()
          }
        )
      }
    }
    else{
      this.rowRequired = true;
      this.rowValidationMsg = '* '+'Subcategory is not saved at row '+(this.editedRow + 1)
    }  
  }

  cancelCategory(){
    this.returnNavigate()
  }

  returnNavigate(){
    this.router.navigate(['/list-trans-category'])
  }

  AddRow(){
    if(this.editedRow === -1){
      this.rowAction      = 'add'    
      this.subCategoryCd  = ''
      this.tmpTSCName     = ''
      this.tmpTSCDesc     = ''
      this.editedRow      = this.transCategory.transactionSubCategory.length
      if(!this.addFirstRow){
        this.transCategory.transactionSubCategory.push(new TransactionSubCategory('','','',0));
      }
      else{
        this.addFirstRow = false; 
        this.editedRow   = 0;
      }      
      this.dataSource = new MatTableDataSource<TransactionSubCategory>(this.transCategory.transactionSubCategory);
    }    
  }

  editRow(transactionSubCategory: TransactionSubCategory,rowid: number){
    this.editedRow      = rowid    
    this.subCategoryCd  = transactionSubCategory.trans_sub_cat_cd
    this.tmpTSCName     = transactionSubCategory.trans_sub_cat_name
    this.tmpTSCDesc     = transactionSubCategory.trans_sub_cat_desc
    this.rowAction      = 'edit'
  }

  deleteRow(rowid: number){
    this.rowAction      = ''    
    this.transCategory.transactionSubCategory.splice(rowid,1)
    this.dataSource = new MatTableDataSource<TransactionSubCategory>(this.transCategory.transactionSubCategory);
  }

  cancelRow(rowid: number){
    if(this.rowAction == 'edit'){
      this.transCategory.transactionSubCategory[rowid].trans_sub_cat_cd   = this.subCategoryCd
      this.transCategory.transactionSubCategory[rowid].trans_sub_cat_name = this.tmpTSCName
      this.transCategory.transactionSubCategory[rowid].trans_sub_cat_desc = this.tmpTSCDesc
    }else{
      this.transCategory.transactionSubCategory.splice(rowid,1)
    }
    this.dataSource = new MatTableDataSource<TransactionSubCategory>(this.transCategory.transactionSubCategory);
    this.subCategoryCd  = ''
    this.tmpTSCName     = ''
    this.tmpTSCDesc     = ''
    this.rowAction      = ''
    this.editedRow      = -1
  }

  saveRow(transactionSubCategory: TransactionSubCategory){
    // console.log(transactionSubCategory)
    this.rowValidationMsg = ''
    if(transactionSubCategory.trans_sub_cat_cd == ''){
      this.rowRequired = true;
      this.rowValidationMsg = '* Subcategory Code is required'
    }
    if(transactionSubCategory.trans_sub_cat_name == ''){
      this.rowRequired = true;
      this.rowValidationMsg = this.rowValidationMsg + '<br/>' + '* Subcategory Name is required'
    }
    if(transactionSubCategory.trans_sub_cat_cd.length < 3){
      this.rowRequired = true;
      this.rowValidationMsg = this.rowValidationMsg + '<br/>' + '* Minimum three character is required for subcategory Code'
    }
    else{
      this.rowRequired      = false;
      this.rowValidationMsg = ''
      this.subCategoryCd    = ''
      this.rowAction        = ''
      this.editedRow        = -1
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
