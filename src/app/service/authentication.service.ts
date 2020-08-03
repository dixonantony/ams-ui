import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, AUTHENTICATION_USER, TOKEN } from '../app.constants';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

 

  constructor(private http: HttpClient) { }

  hardCodedAuthentication(username,password){
    if(username==='admin' && password==='admin'){
      sessionStorage.setItem(AUTHENTICATION_USER,username)
      return true
    }else{
      return false
    }
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATION_USER)
    return !(user === null)
  }

  executeJWTAuthenticationService(username: string, password: string) {   
    return this.http.post<any>(`${API_URL}/authenticate`,{
      username,
      password
    }).pipe(
      map(
        data =>{
          sessionStorage.setItem(AUTHENTICATION_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATION_USER);
  }

  getAuthenticatedToken(){
    if (this.getAuthenticatedUser()){
      return sessionStorage.getItem(TOKEN);
    }
  }
}
