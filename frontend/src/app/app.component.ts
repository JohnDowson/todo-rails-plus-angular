import { Component, OnInit } from '@angular/core';
import { TodoItem } from './todo-item';
import { TodoCategory } from "./todo-category";
import { BackendApiService } from './backend-api.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NewTodoComponent } from './new-todo/new-todo.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'frontend';
  backend_api: BackendApiService
  dialog: MatDialog;
  categories: TodoCategory[];
  constructor(backend_api: BackendApiService, dialog: MatDialog) { this.backend_api = backend_api; this.dialog = dialog; }
  ngOnInit() {
    this.backend_api.getTodos().subscribe(
      (data) => { this.categories = this.constructCategories(data); },
      error => console.error(error)
    );
  }
  handleDirty(todo: TodoItem) {
    this.backend_api.updateTodo(todo).subscribe(
      (data) => { },
      error => console.error(error)
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(NewTodoComponent, {
      data: {
        todo: new TodoItem,
        categories: this.categories.map((cat) => {
          return { title: cat.title, id: cat.id }
        })
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.backend_api.createTodo(result.todo).subscribe(
        (data) => {
          let todo = new TodoItem(data);
          this.categories.find((cat) => cat.id === todo.project_id).todos.push(todo)
        },
        error => console.error(error)
      );
    });
  }
  constructCategories(data) {
    var ret = [];
    data.forEach(cat => {
      var category = new TodoCategory({ id: cat.id, title: cat.title })
      cat.todos.forEach(todo => {
        category.todos.push(new TodoItem(todo))
      });
      ret.push(category);
    });
    return ret
  }
}