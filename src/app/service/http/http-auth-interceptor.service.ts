import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthInterceptorService implements HttpInterceptor{

  constructor(private authenticationService : AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){

    let authString= this.authenticationService.getAuthenticatedToken();
    let username= this.authenticationService.getAuthenticatedUser();
    if(authString && username){
        req = req.clone({
            setHeaders : {Authorization:authString}
          })
    }
    return next.handle(req);
  }
}
