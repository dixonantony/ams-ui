import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVariablesService } from '../global-variables.service';
import { Appartment, AppartmentDataService } from '../service/data/appartment-data.service';
import { Occupant, OccupantDataService, OccupantDetails } from '../service/data/occupant-data.service';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-occupant',
  templateUrl: './occupant.component.html',
  styleUrls: ['./occupant.component.css']
})
export class OccupantComponent implements OnInit {
  occupant  : Occupant 
  selectedAppartments: Appartment[];
  appartments: Appartment[];
  rowAction           : string;
  rowRequired         = false; 
  addFirstRow         = false;
  editedRow           = -1
  rowValidationMsg    : string;
  tmpoccupantDtlId    : number
  tmpFullName         : string;
  tmpRelation         : string;

  displayedColumns: string[] = ['action','fullName','relationship'];
  dataSource: MatTableDataSource<OccupantDetails>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private occupantDataService: OccupantDataService,
              public globalVariablesService: GlobalVariablesService,
              private appartmentDataService: AppartmentDataService) { }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.occupant = new Occupant(this.route.snapshot.params.occupantid,'',new Date(),null,'', '','','','','', '','',null,null);
    this.occupant.occupantDetails = []
    // console.log(this.selectedYears)
    // this.Appartments[0].appartmentCode
    this.appartmentDataService.retrieveAllAppartments()
        .subscribe(
          data => {
            this.appartments             = data            
          }
        )
    if (this.occupant.occupantId != -1){
      this.occupantDataService.retriveOccupantById(this.occupant.occupantId)
        .subscribe(
          data => {
            this.occupant             = data
            this.selectedAppartments = this.occupant.appartments
            this.dataSource = new MatTableDataSource<OccupantDetails>(this.occupant.occupantDetails);
            console.log(this.selectedAppartments)
          }
        )
    }
  }

  cancelOccupant(){
    this.returnNavigate()
  }

  returnNavigate(){
      this.router.navigate(['/list-occupants'])
  }

  saveOccupant(){ 
    console.log(this.occupant)
    this.occupant.occupantDetails
      .forEach(occ => {
        if(occ.occupantDtlId == -1){
          occ.occupantDtlId = null;
        }
      })
      console.log(this.occupant)
    if (this.occupant.occupantId === -1){
      this.occupantDataService.createOccupant(this.occupant)
      .subscribe(
        data => {
          this.returnNavigate()          
        }
      )
    }else{
      console.log(this.occupant)
      this.occupantDataService.updateOccupant(this.occupant)
      .subscribe(
        data => {
          this.returnNavigate()
        }
      )
    }  
  }

  compareAppartments(a1: Appartment, a2: Appartment): boolean {
    return a1 !=null && a2 != null && a1.appartmentCode === a2.appartmentCode;
  }

  AddRow(){
    console.log('AddRow')
    if(this.editedRow === -1){
      this.rowAction        = 'add'    
      this.tmpoccupantDtlId = -1
      this.tmpFullName      = ''
      this.tmpRelation      = ''
      this.editedRow        = this.occupant.occupantDetails.length
      console.log('editedRow')
      if(!this.addFirstRow){
        console.log('addFirstRow')
        this.occupant.occupantDetails.push(new OccupantDetails(-1,this.occupant.occupantId,'','',new Date()));
      }
      else{
        this.addFirstRow = false; 
        this.editedRow   = 0;
      }      
      this.dataSource = new MatTableDataSource<OccupantDetails>(this.occupant.occupantDetails);
    } 
    console.log(this.occupant)   
  }

  editRow(occupantDetails: OccupantDetails,rowid: number){
    this.editedRow      = rowid    
    this.tmpoccupantDtlId  = occupantDetails.occupantDtlId
    this.tmpFullName     = occupantDetails.fullName
    this.tmpRelation     = occupantDetails.relationship
    this.rowAction      = 'edit'
  }

  deleteRow(rowid: number){
    this.rowAction      = ''    
    this.occupant.occupantDetails.splice(rowid,1)
    this.dataSource = new MatTableDataSource<OccupantDetails>(this.occupant.occupantDetails);
  }

  cancelRow(rowid: number){
    if(this.rowAction == 'edit'){
      this.occupant.occupantDetails[rowid].occupantDtlId   = this.tmpoccupantDtlId
      this.occupant.occupantDetails[rowid].fullName = this.tmpFullName
      this.occupant.occupantDetails[rowid].relationship = this.tmpRelation
    }else{
      this.occupant.occupantDetails.splice(rowid,1)
    }
    this.dataSource = new MatTableDataSource<OccupantDetails>(this.occupant.occupantDetails);
    this.tmpoccupantDtlId = -1
    this.tmpFullName      = ''
    this.tmpRelation      = ''
    this.editedRow      = -1
  }

  saveRow(occupantDetails: OccupantDetails){
    console.log(occupantDetails)
    this.rowValidationMsg = ''
    // if(occupantDetails.occupantDtlId == -1){
    //   this.rowRequired = true;
    //   this.rowValidationMsg = '* Subcategory Code is required'
    // }
    if(occupantDetails.fullName == ''){
      this.rowRequired = true;
      this.rowValidationMsg = this.rowValidationMsg + '<br/>' + '* Full Name is required'
    }
    if(occupantDetails.relationship == ''){
      this.rowRequired = true;
      this.rowValidationMsg = this.rowValidationMsg + '<br/>' + '* Must select relationship'
    }
    else{
      this.rowRequired      = false;
      this.rowValidationMsg = ''
      // this.subCategoryCd    = ''
      this.rowAction        = ''
      this.editedRow        = -1
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
}
