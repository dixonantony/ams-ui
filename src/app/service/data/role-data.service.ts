import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';
import { SubMenus } from './submenu-data.service';


export class Role {
  constructor(public roleCode: string,
              public roleName: string,
              public roleDescription: string,
              public subMenus: SubMenus[]){}
}
  
@Injectable({
  providedIn: 'root'
})
export class RoleDataService {
  constructor(private http: HttpClient) { }

  retrieveAllRoles() {
    return this.http.get<Role[]>(`${API_URL}/roles`);
  }

  deleteRoleById(code: string){
    return this.http.delete(`${API_URL}/roles/${code}`);
  }

  retriveRoleById(code: string){
    return this.http.get<Role>(`${API_URL}/roles/${code}`);
  }

  updateRole(role: Role){
    return this.http.put(`${API_URL}/roles`,role);
  }

  createRole(role: Role){
    return this.http.post(`${API_URL}/roles`,role);
  }
}
