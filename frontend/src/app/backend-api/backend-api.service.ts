import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { TodoItem } from "../todo-item/todo-item.model";
import { TodoCategory } from '../todo-category/todo-category.model';

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
  deleteTodo(todo: TodoItem) {
    return this.http.delete(this.api_url + 'todos/' + todo.id).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        return throwError(
          JSON.stringify(error));
      })
    );
  }
  createCategory(category: TodoCategory) {
    return this.http.post<TodoCategory>(this.api_url + 'projects', JSON.stringify({ title: category.title }), jsonHeader).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        return throwError(
          JSON.stringify(error));
      })
    );
  }
  deleteCategory(category_id: number) {
    return this.http.delete(this.api_url + 'projects/' + category_id).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        return throwError(
          JSON.stringify(error));
      })
    );
  }
}
