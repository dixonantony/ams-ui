import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

export class SubMenu {
  constructor(public subMenuCode: string,
              public subMenuName: string,
              public menuURL: string){}
}

export class SubMenus {
  constructor(public subMenu: SubMenu,
              public enableView: string,
              public enableSave: string,
              public enableDelete: string){}
}

@Injectable({
  providedIn: 'root'
})
export class SubmenuDataService {

  constructor(private http: HttpClient) { }

  retrieveAllSubMenus() {
    return this.http.get<SubMenu[]>(`${API_URL}/submenus`);
  }

  deleteSubMenuById(code: string){
    return this.http.delete(`${API_URL}/submenus/${code}`);
  }

  retriveSubMenuById(code: string){
    return this.http.get<SubMenu>(`${API_URL}/submenus/${code}`);
  }

  updateSubMenu(subMenu: SubMenu){
    return this.http.put(`${API_URL}/submenus`,subMenu);
  }

  createSubMenu(subMenu: SubMenu){
    return this.http.post(`${API_URL}/submenus`,subMenu);
  }
}
