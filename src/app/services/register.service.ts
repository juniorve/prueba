import { global } from './global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
public header;
public url;
  constructor(private http:HttpClient) {
      this.url = global.url;
   }
 

  public newDetail(body): Observable<any> {
    this.header = new HttpHeaders().set('Content-Type', 'application/json ');
    const endPoint = `${this.url}/details`;

    return this.http.post(endPoint, body, { headers: this.header });
  }

  public newAcount(body): Observable<any> {
    this.header = new HttpHeaders().set('Content-Type', 'application/json ');
    const endPoint = `${this.url}/accounts`;

    return this.http.post(endPoint, body, { headers: this.header });
  }

}