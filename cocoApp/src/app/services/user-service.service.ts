import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserLogin } from 'src/app/models/user-login';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseURL = environment.apiURL + 'insert/user';
  baseURL1 = environment.apiURL + 'login';
  baseURL2 = environment.apiURL + 'forgot/password';

  constructor(private http: HttpClient) { }

  login(data: UserLogin):Observable<UserLogin> {
    localStorage.setItem('isLoggin', '1')
    return this.http.post<UserLogin>(this.baseURL1, data);
  }
  
  crearUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL, user);
  }

  forgotpass(user: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(this.baseURL2, user);
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('isLoggin'));
  }

  loggedIn() {
    return !!localStorage.getItem('isLoggin');
  }
}
