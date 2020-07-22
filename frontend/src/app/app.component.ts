import { Component, OnInit } from '@angular/core';
import { TodoItem } from './todo-item/todo-item.model';
import { TodoCategory } from "./todo-category/todo-category.model";
import { BackendApiService } from './backend-api/backend-api.service'
import { MatDialog } from "@angular/material/dialog";
import { TodoEditorDialog } from './todo-edit-dialog/todo-edit-dialog.component';
import { CategoryEditDialog } from './category-edit-dialog/category-edit-dialog.component';
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
  trackCategories(_index, item) {
    return item.id
  }
  openEditCategoryDialog(category: TodoCategory) {
    this.openCategoryDialog(true, category)
  }
  openNewCategoryDialog() {
    this.openCategoryDialog(false, new TodoCategory())
  }
  openCategoryDialog(edit: boolean, category: TodoCategory): void {
    let data = {
      category: { title: "" },
      edit: edit
    }
    if (edit) {
      data.category = category
    }

    const dialogRef = this.dialog.open(CategoryEditDialog, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return }
      if (result.edit) {
        this.updateCategory(result)
      } else {
        this.addCategory(result)
      }
    });
  }
  addCategory(result) {
    this.backend_api.createCategory(result.category).subscribe(
      (data) => {
        let category = new TodoCategory(data);
        this.categories.push(category)
      },
      error => console.error(error)
    );
  }
  updateCategory(_) {
    // noop
  }
  deleteCategory(category_id: number) {
    this.backend_api.deleteCategory(category_id).subscribe(
      () => { this.ngOnInit() /* this.categories.filter((cat) => cat.id !== category_id) */ },
      error => console.error(error)
    );
  }
  openEditTodoDialog(todo: TodoItem) {
    this.openTodoDialog(true, todo)
  }
  openNewTodoDialog() {
    this.openTodoDialog(false, new TodoItem({}))
  }
  openTodoDialog(edit: boolean, todo_edit: TodoItem): void {
    let data = {
      todo: {},
      categories: this.categories.map((cat) => {
        return { title: cat.title, id: cat.id }
      }),
      edit: edit
    }
    if (edit) {
      data.todo = todo_edit
    } else {
      data.todo = new TodoItem()
    }

    const dialogRef = this.dialog.open(TodoEditorDialog, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return }
      if (result.edit) {
        this.updateTodo(result.todo)
      } else {
        this.addTodo(result)
      }
    });
  }
  deleteTodo(todo: TodoItem) {
    this.backend_api.deleteTodo(todo).subscribe(
      () => {
        let category = this.categories.find((cat) => cat.id === todo.project_id)
        category.todos = category.todos.filter((t) => t.id !== todo.id)
      },
      error => console.error(error)
    );
  }
  updateTodo(todo: TodoItem) {
    this.backend_api.updateTodo(todo).subscribe(
      () => {
        this.ngOnInit()
        /* let category = this.categories.find((cat) => cat.id === todo.project_id)
        let index = category.todos.findIndex((td) => td.id === todo.id)
        if (index !== -1) {
          category.todos[index] = todo
        } else {
          // todo's category has changed, need to remove it from the old category
          let old_cat = this.categories.find((cat) => {
            return cat.todos.find((td) => {
              return td.id === todo.id
            })
          })
          old_cat.todos.filter((td) => td.id !== todo.id)
          category.todos.push(todo) 
      }*/
      },
      error => console.error(error)
    );
  }
  addTodo(result) {
    this.backend_api.createTodo(result.todo).subscribe(
      (data) => {
        let todo = new TodoItem(data);
        this.categories.find((cat) => cat.id === todo.project_id).todos.push(todo)
      },
      error => console.error(error)
    );
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