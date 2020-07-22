import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from "../todo-item/todo-item.model";
import { TodoCategory } from './todo-category.model';

@Component({
  selector: 'app-todo-category',
  templateUrl: './todo-category.component.html',
  styleUrls: ['./todo-category.component.scss']
})
export class TodoCategoryComponent implements OnInit {
  @Input()
  category: TodoCategory;
  @Output()
  edit: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  @Output()
  done: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  constructor() { }
  emitEdit(todo: TodoItem) {
    this.edit.emit(todo)
  }
  emitDone(todo: TodoItem) {
    this.done.emit(todo)
  }
  ngOnInit(): void {
  }

}
