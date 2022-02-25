import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../User";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private hostURL = 'http://localhost:8090';
  private port = 5000;
  private apiURL = `${this.hostURL}/api/v1`;

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User>{
    const registrationURL = `${this.apiURL}/signup`;
    return this.http.post<User>(registrationURL, user, httpOptions);
  }

  loginUser(user:User): Observable<any> {
    const loginURL = `${this.apiURL}/login`;
    return this.http.post<User>(loginURL, user, httpOptions);
  }

  logoutUser(): Observable<any> {
    const logoutURL = `${this.apiURL}/logout`;
    return this.http.post<any>(logoutURL, httpOptions);
  }




}
