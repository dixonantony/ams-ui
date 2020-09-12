import { Component, OnInit, ViewChild } from '@angular/core';
import { Role, RoleDataService} from '../service/data/role-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SubMenus, SubMenu, SubmenuDataService } from '../service/data/submenu-data.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  role : Role
  successMsg = '';
  subMenus  : SubMenu[]
  menus     : SubMenus[] = []

  displayedColumns: string[] = ['menuName', 'enableView','enableSave', 'enableDelete'];
  dataSource: MatTableDataSource<SubMenus>;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private roleDataService: RoleDataService,
              private router: Router,
              private route: ActivatedRoute,
              private submenuDataService: SubmenuDataService) { }

  ngOnInit(): void {
    this.successMsg = '';    
    this.role = new Role(this.route.snapshot.params.rolecode,'','',null);

    if (this.role.roleCode != 'nr'){
      this.roleDataService.retriveRoleById(this.role.roleCode)
        .subscribe(
          data => {
            this.role = data
            this.submenuDataService.retrieveAllSubMenus()
              .subscribe(
                data => {
                  this.subMenus = data;
                  this.subMenus
                    .forEach(
                      menu => {
                        this.menus.push(new SubMenus(menu,'N','N','N'))
                    })
                  if(typeof this.role.subMenus == 'undefined'
                      || this.role.subMenus == null
                      || this.role.subMenus.length == 0){
                    this.role.subMenus = this.menus;
                  }else{
                    this.role.subMenus = this.role.subMenus
                                            .concat(this.menus
                                              .filter(x => this.role.subMenus
                                                  .every(y => y.subMenu.subMenuCode != x.subMenu.subMenuCode)));
                   
                    }
                    this.dataSource = new MatTableDataSource<SubMenus>(this.role.subMenus);
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                  }  
                )
            }
        )
    }else{
      this.role.roleCode = '';
      this.role.subMenus = []
      this.submenuDataService.retrieveAllSubMenus()
              .subscribe(
                data => {
                  this.subMenus = data;
                  this.subMenus
                    .forEach(
                      menu => {
                        this.role.subMenus.push(new SubMenus(menu,'N','N','N'))
                    })                  
              this.dataSource = new MatTableDataSource<SubMenus>(this.role.subMenus);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
          }  
        )
      }     
  }

  saveRole(){    
    console.log(this.role)
    if (this.role.roleCode != 'nr'){
      this.roleDataService.createRole(this.role)
      .subscribe(
        data => {
          this.returnNavigate()          
        }
      )
    }else{
      this.roleDataService.updateRole(this.role)
      .subscribe(
        data => {
          this.returnNavigate()
        }
      )
    }   
  }

  cancelRole(){
    this.returnNavigate()
  }

  returnNavigate(){
    this.router.navigate(['/list-roles'])
  }

}
