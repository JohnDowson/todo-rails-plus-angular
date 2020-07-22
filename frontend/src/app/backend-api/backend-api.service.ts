import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { TodoItem } from "../todo-item/todo-item.model";

const jsonHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}
@Injectable()
export class BackendApiService {

  api_url = environment.api_url;
  constructor(private http: HttpClient) { }
  getTodos() {
    return this.http.get(
      this.api_url + 'projects',
      { responseType: 'json' }).pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {
          return throwError(
            JSON.stringify(error));
        })
      );
  }
  updateTodo(todo: TodoItem) {
    return this.http.patch(this.api_url + 'todos/' + todo.id, JSON.stringify(todo), jsonHeader).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        return throwError(
          JSON.stringify(error));
      })
    );
  }
  createTodo(todo: TodoItem) {
    return this.http.post<TodoItem>(this.api_url + 'todos', JSON.stringify(todo), jsonHeader).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        return throwError(
          JSON.stringify(error));
      })
    );
  }
}
