import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset = utf-8',
      'Authorization': 'Basic ' + btoa('kapak:UserKapak2020!'),
      'Accept': 'application/json, text/plain, */*',
       'Access-Encoding': 'gzip, deflate', 
       'Access-Control-Allow-Origin': '*', 
       'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 
       'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    const reqClone = req.clone({
      headers
    });
    return next.handle(reqClone);
    }  
}
