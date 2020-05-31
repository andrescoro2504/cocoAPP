import { Component } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage  {

  constructor(private http:HttpClient) { }

  onCreate(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
     Authorization:'Bearer '+token
    });
  
  this.http.post(`http://localhost/base/api/create` , 'body', {headers}).subscribe(console.log);

  }
  
  
}
