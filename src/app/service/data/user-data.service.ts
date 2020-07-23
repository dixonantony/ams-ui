import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

export class User {
  constructor(public user_id: number,
              public username: string,
              public password: string,
              public firstName: string, 
              public lastName: string, 
              public email: string, 
              public mobNo: string,               
              public created: Date,
              public lastUpdated: Date){

  }
}
  
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  retrieveAllUsers() {
    return this.http.get<User[]>(`${API_URL}/users`);
  }

  deleteUserById(username: string){
    return this.http.delete(`${API_URL}/users/${username}`);
  }

  retriveUserByUsername(username: string){
    return this.http.get<User>(`${API_URL}/users/${username}`);
  }

  updateUser(user: User){
    return this.http.put(`${API_URL}/users`,user);
  }

  createUser(user: User){
    return this.http.post(`${API_URL}/users`,user);
  }
}
