import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "../../Todo";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  
  private hostURL = 'http://localhost:8090';
  private port = 5000;
  private apiURL = `${this.hostURL}/api/v1/u/todoItems`;

  constructor(private http: HttpClient) { }

  getTodoList(): Observable<any>{
    return this.http.get<any>(this.apiURL);
  }

  deleteTodo(todo: Todo): Observable<Todo>{
    const URL = `${this.apiURL}/${todo._id}`;
    return this.http.delete<Todo>(URL, httpOptions);
  }

  modifyTodo(todo: Todo): Observable<Todo>{
    const URL = `${this.apiURL}/${todo._id}`;
    return this.http.put<Todo>(URL, todo, httpOptions);
  }

  addTodo(todo: Todo): Observable<any>{
    return this.http.post<any>(this.apiURL, todo, httpOptions);
  }

}
